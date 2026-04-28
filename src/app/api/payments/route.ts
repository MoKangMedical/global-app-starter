import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 获取查询参数
    const customerId = searchParams.get('customer_id');
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const startingAfter = searchParams.get('starting_after');
    const createdGte = searchParams.get('created_gte');
    const createdLte = searchParams.get('created_lte');

    // 构建查询参数
    const listParams: Stripe.PaymentIntentListParams = {
      limit: Math.min(limit, 100), // 最大100条
    };

    // 如果有客户ID，按客户过滤
    if (customerId) {
      listParams.customer = customerId;
    }

    // 如果有邮箱，先查找客户
    if (email && !customerId) {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        listParams.customer = customers.data[0].id;
      } else {
        // 没有找到客户，返回空数组
        return NextResponse.json({
          success: true,
          data: [],
          hasMore: false,
        });
      }
    }

    // 如果有状态过滤
    if (status && status !== 'all') {
      listParams.status = status as Stripe.PaymentIntent.Status;
    }

    // 如果有分页参数
    if (startingAfter) {
      listParams.starting_after = startingAfter;
    }

    // 如果有日期范围
    if (createdGte || createdLte) {
      listParams.created = {};
      if (createdGte) {
        listParams.created.gte = Math.floor(new Date(createdGte).getTime() / 1000);
      }
      if (createdLte) {
        listParams.created.lte = Math.floor(new Date(createdLte).getTime() / 1000);
      }
    }

    // 获取支付意图列表
    const paymentIntents = await stripe.paymentIntents.list(listParams);

    // 格式化返回数据
    const formattedPayments = paymentIntents.data.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      description: payment.description || payment.metadata?.productName || 'Payment',
      created: new Date(payment.created * 1000).toISOString(),
      paymentMethod: payment.payment_method_types?.[0] || 'card',
      receiptUrl: payment.latest_charge 
        ? (typeof payment.latest_charge === 'string' 
          ? null 
          : payment.latest_charge.receipt_url)
        : null,
      customerEmail: payment.receipt_email || payment.metadata?.customerEmail || '',
      customerName: payment.metadata?.customerName || '',
      metadata: payment.metadata,
    }));

    return NextResponse.json({
      success: true,
      data: formattedPayments,
      hasMore: paymentIntents.has_more,
      totalCount: paymentIntents.data.length,
    });

  } catch (error) {
    console.error('Payment history error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve payment history' },
      { status: 500 }
    );
  }
}

// 获取单个支付详情
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID required' },
        { status: 400 }
      );
    }

    // 获取支付意图详情
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
      expand: ['latest_charge', 'customer'],
    });

    // 获取关联的支付方式
    let paymentMethod = null;
    if (paymentIntent.payment_method) {
      if (typeof paymentIntent.payment_method === 'string') {
        paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
      } else {
        paymentMethod = paymentIntent.payment_method;
      }
    }

    // 格式化返回数据
    const formattedPayment = {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      description: paymentIntent.description || paymentIntent.metadata?.productName || 'Payment',
      created: new Date(paymentIntent.created * 1000).toISOString(),
      paymentMethod: paymentIntent.payment_method_types?.[0] || 'card',
      receiptUrl: paymentIntent.latest_charge 
        ? (typeof paymentIntent.latest_charge === 'string' 
          ? null 
          : paymentIntent.latest_charge.receipt_url)
        : null,
      customerEmail: paymentIntent.receipt_email || paymentIntent.metadata?.customerEmail || '',
      customerName: paymentIntent.metadata?.customerName || '',
      metadata: paymentIntent.metadata,
      paymentMethodDetails: paymentMethod ? {
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
        } : null,
        billingDetails: paymentMethod.billing_details,
      } : null,
      charges: paymentIntent.latest_charge 
        ? (typeof paymentIntent.latest_charge === 'string' 
          ? [] 
          : [{
              id: paymentIntent.latest_charge.id,
              amount: paymentIntent.latest_charge.amount,
              status: paymentIntent.latest_charge.status,
              created: new Date(paymentIntent.latest_charge.created * 1000).toISOString(),
              receiptUrl: paymentIntent.latest_charge.receipt_url,
            }])
        : [],
    };

    return NextResponse.json({
      success: true,
      data: formattedPayment,
    });

  } catch (error) {
    console.error('Payment details error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve payment details' },
      { status: 500 }
    );
  }
}