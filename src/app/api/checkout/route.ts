import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
});

// 支付产品配置
const PRODUCTS = {
  starter: {
    name: 'Starter Plan',
    description: 'Perfect for testing and small projects',
    amount: 900, // $9.00 in cents
    currency: 'usd',
    interval: 'month',
  },
  pro: {
    name: 'Professional Plan',
    description: 'For growing businesses ready to expand',
    amount: 4900, // $49.00 in cents
    currency: 'usd',
    interval: 'month',
  },
  enterprise: {
    name: 'Enterprise Plan',
    description: 'For large organizations with complex needs',
    amount: 19900, // $199.00 in cents
    currency: 'usd',
    interval: 'month',
  },
};

// 支付方式映射
const PAYMENT_METHOD_TYPES: Record<string, string[]> = {
  card: ['card'],
  alipay: ['alipay'],
  wechat: ['wechat_pay'],
  bank: ['customer_balance'],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      productId, 
      email, 
      name, 
      country, 
      paymentMethod = 'card',
      amount,
      currency = 'usd'
    } = body;

    // 验证必填字段
    if (!productId || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 获取产品信息
    const product = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      );
    }

    // 创建或获取客户
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          country,
          source: 'global-app-starter',
        },
      });
    }

    // 确定支付方式类型
    const paymentMethodTypes = PAYMENT_METHOD_TYPES[paymentMethod] || ['card'];

    // 创建支付意图
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || product.amount,
      currency: currency || product.currency,
      customer: customer.id,
      payment_method_types: paymentMethodTypes,
      metadata: {
        productId,
        productName: product.name,
        customerEmail: email,
        customerName: name,
        country,
      },
      description: `${product.name} - ${email}`,
      receipt_email: email,
      statement_descriptor: 'GLOBAL APP STARTER',
      statement_descriptor_suffix: productId.toUpperCase(),
    });

    // 如果是微信支付，需要特殊处理
    if (paymentMethod === 'wechat') {
      // 创建微信支付意图
      const wechatIntent = await stripe.paymentIntents.create({
        amount: amount || product.amount,
        currency: currency || product.currency,
        customer: customer.id,
        payment_method_types: ['wechat_pay'],
        payment_method_options: {
          wechat_pay: {
            client: 'web',
          },
        },
        metadata: {
          productId,
          productName: product.name,
          customerEmail: email,
          customerName: name,
          country,
        },
      });

      return NextResponse.json({
        success: true,
        paymentId: wechatIntent.id,
        clientSecret: wechatIntent.client_secret,
        paymentMethod: 'wechat',
        qrCode: wechatIntent.next_action?.wechat_pay_display_qr_code,
      });
    }

    // 如果是支付宝，需要特殊处理
    if (paymentMethod === 'alipay') {
      const alipayIntent = await stripe.paymentIntents.create({
        amount: amount || product.amount,
        currency: currency || product.currency,
        customer: customer.id,
        payment_method_types: ['alipay'],
        metadata: {
          productId,
          productName: product.name,
          customerEmail: email,
          customerName: name,
          country,
        },
      });

      return NextResponse.json({
        success: true,
        paymentId: alipayIntent.id,
        clientSecret: alipayIntent.client_secret,
        paymentMethod: 'alipay',
        redirectUrl: alipayIntent.next_action?.alipay_handle_redirect?.url,
      });
    }

    // 返回支付意图信息
    return NextResponse.json({
      success: true,
      paymentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      paymentMethod: 'card',
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });

  } catch (error) {
    console.error('Payment error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// 获取支付状态
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get('payment_intent');

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID required' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      success: true,
      paymentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      created: new Date(paymentIntent.created * 1000).toISOString(),
    });

  } catch (error) {
    console.error('Payment status error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve payment status' },
      { status: 500 }
    );
  }
}