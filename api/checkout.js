// Stripe Checkout Session Creation
import Stripe from 'stripe';
import { demoData } from '../../lib/demo-data.js';

const DEMO_MODE = process.env.DEMO_MODE === 'true';
const stripe = DEMO_MODE ? null : new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    if (DEMO_MODE) {
      // In demo mode, just return a mock checkout URL
      return res.status(200).json({
        url: '/account?demo_payment=success',
        demo: true
      });
    }
    
    // TODO: Verify user auth with Supabase
    // const authHeader = req.headers.authorization;
    // const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    
    const { household_id, items } = req.body;
    
    if (!household_id || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Fetch household from DB to get/create Stripe customer
    // For now, using placeholder
    let stripeCustomerId = null;
    
    // TODO: Get from DB:
    // const { data: household } = await supabase
    //   .from('households')
    //   .select('stripe_customer_id, email, name')
    //   .eq('id', household_id)
    //   .single();
    
    // Create customer if needed
    // if (!household.stripe_customer_id) {
    //   const customer = await stripe.customers.create({
    //     email: household.email,
    //     name: household.name,
    //     metadata: { household_id }
    //   });
    //   stripeCustomerId = customer.id;
    //   // Update DB with customer ID
    // } else {
    //   stripeCustomerId = household.stripe_customer_id;
    // }
    
    // Compute line items from DB prices
    const lineItems = [];
    
    for (const item of items) {
      // TODO: Fetch price from DB
      // const { data: price } = await supabase
      //   .from('prices')
      //   .select('amount_cents')
      //   .eq('program_id', item.program_id)
      //   .eq('term_type', item.term_type)
      //   .eq('season_year', item.season_year)
      //   .single();
      
      const amount = 51500; // placeholder
      
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.program_name} - ${item.term_name}`,
            description: `${item.member_name}`
          },
          unit_amount: amount
        },
        quantity: 1
      });
    }
    
    // Add coaches fee if applicable
    // TODO: Check if household needs coaches fee for this season
    const needsCoachesFee = false;
    if (needsCoachesFee) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Annual Coaches Fee 2027',
            description: 'Supports tournaments and visiting coaches'
          },
          unit_amount: 22500 // or 35000 based on # of children
        },
        quantity: 1
      });
    }
    
    // Create order record first
    // TODO: Insert into orders table, get order_id
    const orderId = 'temp-order-id';
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'payment',
      payment_method_types: ['us_bank_account', 'card'],
      line_items: lineItems,
      success_url: `${process.env.SITE_URL}/account?payment=success`,
      cancel_url: `${process.env.SITE_URL}/join?canceled=1`,
      client_reference_id: orderId,
      metadata: {
        household_id,
        order_id: orderId
      }
    }, {
      idempotencyKey: orderId
    });
    
    return res.status(200).json({
      url: session.url,
      session_id: session.id
    });
    
  } catch (error) {
    console.error('Error in /api/checkout:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
