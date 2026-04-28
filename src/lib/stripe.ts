import Stripe from 'stripe';
 
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
});
 
export const PLANS = {
  starter: {
    name: 'Starter',
    description: 'Perfect for individuals',
    price: 900, // $9.00 in cents
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    features: [
      '5 projects',
      '10GB storage',
      'Basic analytics',
      'Email support',
    ],
  },
  pro: {
    name: 'Professional',
    description: 'Best for small teams',
    price: 2900, // $29.00 in cents
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large organizations',
    price: null, // Custom pricing
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom SLA',
      'On-premise option',
      'SSO & SAML',
      'Audit logs',
    ],
  },
} as const;
 
export type PlanId = keyof typeof PLANS;
