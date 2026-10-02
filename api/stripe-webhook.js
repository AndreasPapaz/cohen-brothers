// Stripe Webhook Handler
import Stripe from 'stripe';

const DEMO_MODE = process.env.DEMO_MODE === 'true';
const stripe = DEMO_MODE ? null : new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false // Need raw body for signature verification
  }
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  if (DEMO_MODE) {
    return res.status(200).json({ received: true, demo: true });
  }
  
  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    
    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Idempotency check
    // TODO: Insert into stripe_events table with ON CONFLICT DO NOTHING
    // const { data: inserted } = await supabase
    //   .from('stripe_events')
    //   .insert({ id: event.id, type: event.type })
    //   .select()
    //   .single();
    // 
    // if (!inserted) {
    //   // Duplicate event, return 200 without processing
    //   return res.status(200).json({ received: true, duplicate: true });
    // }
    
    // Handle events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
        
      case 'checkout.session.async_payment_succeeded':
        await handleAsyncPaymentSucceeded(event.data.object);
        break;
        
      case 'checkout.session.async_payment_failed':
        await handleAsyncPaymentFailed(event.data.object);
        break;
        
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object);
        break;
        
      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleCheckoutCompleted(session) {
  console.log('Checkout completed:', session.id);
  
  const orderId = session.client_reference_id;
  
  if (session.payment_status === 'paid') {
    // Card payment - immediate fulfillment
    await fulfillOrder(orderId, session);
  } else if (session.payment_status === 'unpaid') {
    // ACH processing - mark as processing
    // TODO: Update order status to 'processing'
    // await supabase
    //   .from('orders')
    //   .update({ 
    //     status: 'processing',
    //     stripe_checkout_session_id: session.id,
    //     stripe_payment_intent_id: session.payment_intent,
    //     payment_method_type: 'us_bank_account'
    //   })
    //   .eq('id', orderId);
  }
}

async function handleAsyncPaymentSucceeded(session) {
  console.log('Async payment succeeded:', session.id);
  
  const orderId = session.client_reference_id;
  await fulfillOrder(orderId, session);
}

async function handleAsyncPaymentFailed(session) {
  console.log('Async payment failed:', session.id);
  
  const orderId = session.client_reference_id;
  
  // TODO: Update order status to 'failed'
  // await supabase
  //   .from('orders')
  //   .update({ status: 'failed' })
  //   .eq('id', orderId);
  
  // TODO: Send email to parent
  // await resend.emails.send({
  //   from: 'Cohen Judo <noreply@cohensjudoclub.com>',
  //   to: household.email,
  //   subject: 'Payment failed - Action required',
  //   html: '...'
  // });
}

async function fulfillOrder(orderId, session) {
  console.log('Fulfilling order:', orderId);
  
  // TODO: Transaction to:
  // 1. Update order status to 'paid', set paid_at
  // 2. Get order_items for this order
  // 3. Insert memberships rows
  // 4. Insert season_fees if applicable
  
  // await supabase.rpc('fulfill_order', {
  //   p_order_id: orderId,
  //   p_stripe_payment_intent_id: session.payment_intent,
  //   p_paid_at: new Date().toISOString()
  // });
}

async function handleChargeRefunded(charge) {
  console.log('Charge refunded:', charge.id);
  
  // TODO: Flag for admin review
  // Find order by payment_intent_id and mark for review
}

async function handleDisputeCreated(dispute) {
  console.log('Dispute created:', dispute.id);
  
  // TODO: Flag for admin review
  // Alert admin, mark order as disputed
}
