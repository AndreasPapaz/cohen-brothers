// Admin API - Record offline payment
import { demoData } from '../../../lib/demo-data.js';
import { randomUUID } from 'crypto';

const DEMO_MODE = process.env.DEMO_MODE === 'true';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    if (!DEMO_MODE) {
      // TODO: Real Supabase auth check
      return res.status(501).json({ error: 'Real auth not implemented yet - set DEMO_MODE=true' });
    }
    
    const { household_id, source, reference, paid_at, items, include_coaches_fee, coaches_fee_amount } = req.body;
    
    if (!household_id || !source || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In demo mode, just validate and return success
    // Real implementation would insert into database
    
    const orderId = randomUUID();
    const totalAmount = items.reduce((sum, item) => sum + item.amount_cents, 0) + 
                       (include_coaches_fee ? (coaches_fee_amount || 0) : 0);
    
    const order = {
      id: orderId,
      household_id,
      source,
      status: 'paid',
      amount_cents: totalAmount,
      reference: reference || null,
      recorded_by: 'admin-user-id', // Would be from JWT
      paid_at: paid_at || new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    // In demo mode, add to in-memory data
    if (DEMO_MODE) {
      demoData.orders.push(order);
      
      // Add memberships
      items.forEach(item => {
        const membership = {
          member_id: item.member_id,
          program_id: item.program_id,
          term_id: item.term_id,
          plan: item.term_id.includes('Q') ? 'quarter' : 'year',
          start_date: item.start_date,
          end_date: item.end_date,
          status: 'paid',
          order_item_id: randomUUID(),
          created_at: new Date().toISOString()
        };
        demoData.memberships.push(membership);
      });
    }
    
    return res.status(200).json({
      success: true,
      order_id: orderId,
      message: 'Payment recorded successfully'
    });
    
  } catch (error) {
    console.error('Error in /api/admin/offline-payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
