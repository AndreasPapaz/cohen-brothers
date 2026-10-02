// Admin API - Export members to CSV
import { computeMemberStatus } from '../../../lib/demo-data.js';

const DEMO_MODE = process.env.DEMO_MODE === 'true';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    if (!DEMO_MODE) {
      // TODO: Real Supabase auth check
      return res.status(501).json({ error: 'Real auth not implemented yet - set DEMO_MODE=true' });
    }
    
    // Get all active members
    const members = computeMemberStatus();
    const activeMembers = members.filter(m => 
      m.bucket === 'active' || 
      m.bucket === 'expiring_30' || 
      m.bucket === 'expiring_7' || 
      m.bucket === 'expires_today'
    );
    
    // Generate CSV
    const headers = ['First Name', 'Last Name', 'Birth Date', 'Household', 'Email', 'Phone', 'Program', 'Plan', 'Paid Through', 'Status'];
    const rows = activeMembers.map(m => [
      m.first_name,
      m.last_name,
      m.birth_date || '',
      m.household_name,
      m.email,
      m.phone || '',
      m.program_name || '',
      m.plan || '',
      m.last_paid_end || '',
      m.bucket
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="cohen-judo-roster-${new Date().toISOString().split('T')[0]}.csv"`);
    return res.status(200).send(csv);
    
  } catch (error) {
    console.error('Error in /api/admin/export:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
