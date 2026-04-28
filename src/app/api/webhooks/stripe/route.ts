import {NextRequest, NextResponse} from 'next/server';
import {stripe} from '@/lib/stripe';
import Stripe from 'stripe';
 
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
 
  let event: Stripe.Event;
 
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      {error: 'Webhook signature verification failed'},
      {status: 400}
    );
  }
 
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful checkout
        console.log('Checkout completed:', session.id);
        // TODO: Update user subscription in database
        break;
      }
 
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription update
        console.log('Subscription updated:', subscription.id);
        break;
      }
 
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription cancellation
        console.log('Subscription cancelled:', subscription.id);
        break;
      }
 
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // Handle successful payment
        console.log('Payment succeeded:', invoice.id);
        break;
      }
 
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // Handle failed payment
        console.log('Payment failed:', invoice.id);
        break;
      }
 
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
 
    return NextResponse.json({received: true});
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      {error: 'Error processing webhook'},
      {status: 500}
    );
  }
}
