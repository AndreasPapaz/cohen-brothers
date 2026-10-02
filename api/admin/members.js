// Admin API - Get members by bucket with filtering
import { demoData, computeMemberStatus } from '../../../lib/demo-data.js';

const DEMO_MODE = process.env.DEMO_MODE === 'true';

export default async function handler(req, res) {
  // CORS for demo mode
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // In demo mode, skip auth check
    if (!DEMO_MODE) {
      // TODO: Real Supabase auth check
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Verify JWT and check role === 'admin'
      return res.status(501).json({ error: 'Real auth not implemented yet - set DEMO_MODE=true' });
    }
    
    // Get query params
    const { bucket, source, program, search } = req.query;
    
    // Get all member statuses
    let members = computeMemberStatus();
    
    // Filter by bucket if specified
    if (bucket && bucket !== 'all') {
      if (bucket === 'pending_ach') {
        members = members.filter(m => m.has_pending);
      } else if (bucket === 'lapsed') {
        members = members.filter(m => m.bucket === 'expired' || m.status === 'inactive');
      } else {
        members = members.filter(m => m.bucket === bucket);
      }
    }
    
    // Filter by source if specified
    if (source) {
      const memberIds = new Set();
      demoData.orders
        .filter(o => o.source === source && o.status === 'paid')
        .forEach(o => {
          const household = demoData.households.find(h => h.id === o.household_id);
          if (household) {
            demoData.members
              .filter(m => m.household_id === household.id)
              .forEach(m => memberIds.add(m.id));
          }
        });
      members = members.filter(m => memberIds.has(m.id));
    }
    
    // Filter by program if specified
    if (program) {
      members = members.filter(m => m.program_id === program);
    }
    
    // Search by name if specified
    if (search) {
      const searchLower = search.toLowerCase();
      members = members.filter(m => 
        m.first_name.toLowerCase().includes(searchLower) ||
        m.last_name.toLowerCase().includes(searchLower) ||
        m.household_name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by last name
    members.sort((a, b) => a.last_name.localeCompare(b.last_name));
    
    // Compute summary counts
    const allMembers = computeMemberStatus();
    const counts = {
      active: allMembers.filter(m => m.bucket === 'active').length,
      expiring_30: allMembers.filter(m => m.bucket === 'expiring_30').length,
      expiring_7: allMembers.filter(m => m.bucket === 'expiring_7').length,
      expires_today: allMembers.filter(m => m.bucket === 'expires_today').length,
      expired: allMembers.filter(m => m.bucket === 'expired' || m.status === 'inactive').length,
      pending_ach: allMembers.filter(m => m.has_pending).length,
      total: allMembers.length
    };
    
    return res.status(200).json({
      members,
      counts,
      demo: DEMO_MODE
    });
    
  } catch (error) {
    console.error('Error in /api/admin/members:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
