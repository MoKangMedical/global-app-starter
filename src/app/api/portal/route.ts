import {NextRequest, NextResponse} from 'next/server';
import {stripe} from '@/lib/stripe';
 
export async function POST(req: NextRequest) {
  try {
    const {customerId, returnUrl} = await req.json();
 
    if (!customerId) {
      return NextResponse.json(
        {error: 'Customer ID is required'},
        {status: 400}
      );
    }
 
    // Create a Stripe customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    });
 
    return NextResponse.json({url: session.url});
  } catch (err) {
    console.error('Error creating portal session:', err);
    return NextResponse.json(
      {error: 'Error creating portal session'},
      {status: 500}
    );
  }
}
