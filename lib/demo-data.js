// Demo mode - in-memory data store for local testing without Supabase
// This mimics the database structure for demonstration purposes

export const demoData = {
  // Current demo date (for computing expiry buckets)
  currentDate: '2026-10-02',
  
  programs: [
    { id: 'little_judokas', name: 'Little Judokas', coaches_fee_exempt: true },
    { id: 'cobras', name: 'Judo Cobras', coaches_fee_exempt: false },
    { id: 'warriors', name: 'Judo Warriors', coaches_fee_exempt: false },
    { id: 'gladiators', name: 'Judo Gladiators', coaches_fee_exempt: false },
    { id: 'collegiate', name: 'Collegiate High Performance', coaches_fee_exempt: false },
    { id: 'adult_rec', name: 'Adult Rec Team', coaches_fee_exempt: false }
  ],

  households: [
    // Active
    { id: '11111111-1111-1111-1111-111111111111', name: 'Anderson Family', email: 'sarah.anderson@example.com', phone: '847-555-0101' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Martinez Family', email: 'carlos.martinez@example.com', phone: '847-555-0102' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Chen Family', email: 'lisa.chen@example.com', phone: '847-555-0103' },
    // Expiring today
    { id: '44444444-4444-4444-4444-444444444444', name: 'Johnson Family', email: 'mike.johnson@example.com', phone: '847-555-0104' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Williams Family', email: 'jennifer.williams@example.com', phone: '847-555-0105' },
    // Expiring 7 days
    { id: '66666666-6666-6666-6666-666666666666', name: 'Garcia Family', email: 'ana.garcia@example.com', phone: '847-555-0106' },
    { id: '77777777-7777-7777-7777-777777777777', name: 'Patel Family', email: 'raj.patel@example.com', phone: '847-555-0107' },
    // Expiring 30 days
    { id: '88888888-8888-8888-8888-888888888888', name: 'Smith Family', email: 'david.smith@example.com', phone: '847-555-0108' },
    { id: '99999999-9999-9999-9999-999999999999', name: 'Brown Family', email: 'emily.brown@example.com', phone: '847-555-0109' },
    // Expired
    { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Taylor Family', email: 'michelle.taylor@example.com', phone: '847-555-0110' },
    { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: 'Davis Family', email: 'robert.davis@example.com', phone: '847-555-0111' },
    // Inactive
    { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', name: 'Wilson Family', email: 'susan.wilson@example.com', phone: '847-555-0112' },
    // Pending ACH
    { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', name: 'Moore Family', email: 'james.moore@example.com', phone: '847-555-0113' },
    // Adult/Collegiate
    { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', name: 'Thomas (Adult)', email: 'michael.thomas@example.com', phone: '847-555-0114' },
    { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', name: 'Rodriguez (Collegiate)', email: 'alex.rodriguez@example.com', phone: '847-555-0115' }
  ],

  members: [
    // Active
    { id: 'a1111111-1111-1111-1111-111111111111', household_id: '11111111-1111-1111-1111-111111111111', first_name: 'Emma', last_name: 'Anderson', birth_date: '2015-03-15', status: 'active' },
    { id: 'a1111111-1111-1111-1111-111111111112', household_id: '11111111-1111-1111-1111-111111111111', first_name: 'Liam', last_name: 'Anderson', birth_date: '2013-07-22', status: 'active' },
    { id: 'a2222222-2222-2222-2222-222222222222', household_id: '22222222-2222-2222-2222-222222222222', first_name: 'Sofia', last_name: 'Martinez', birth_date: '2016-11-08', status: 'active' },
    { id: 'a3333333-3333-3333-3333-333333333333', household_id: '33333333-3333-3333-3333-333333333333', first_name: 'Noah', last_name: 'Chen', birth_date: '2012-05-19', status: 'active' },
    { id: 'a3333333-3333-3333-3333-333333333334', household_id: '33333333-3333-3333-3333-333333333333', first_name: 'Mia', last_name: 'Chen', birth_date: '2014-09-30', status: 'active' },
    // Expiring today
    { id: 'a4444444-4444-4444-4444-444444444444', household_id: '44444444-4444-4444-4444-444444444444', first_name: 'Olivia', last_name: 'Johnson', birth_date: '2015-02-14', status: 'active' },
    { id: 'a5555555-5555-5555-5555-555555555555', household_id: '55555555-5555-5555-5555-555555555555', first_name: 'Ethan', last_name: 'Williams', birth_date: '2013-08-07', status: 'active' },
    // Expiring 7 days
    { id: 'a6666666-6666-6666-6666-666666666666', household_id: '66666666-6666-6666-6666-666666666666', first_name: 'Isabella', last_name: 'Garcia', birth_date: '2016-04-12', status: 'active' },
    { id: 'a6666666-6666-6666-6666-666666666667', household_id: '66666666-6666-6666-6666-666666666666', first_name: 'Lucas', last_name: 'Garcia', birth_date: '2014-01-25', status: 'active' },
    { id: 'a7777777-7777-7777-7777-777777777777', household_id: '77777777-7777-7777-7777-777777777777', first_name: 'Ava', last_name: 'Patel', birth_date: '2015-10-03', status: 'active' },
    // Expiring 30 days
    { id: 'a8888888-8888-8888-8888-888888888888', household_id: '88888888-8888-8888-8888-888888888888', first_name: 'Mason', last_name: 'Smith', birth_date: '2013-06-18', status: 'active' },
    { id: 'a9999999-9999-9999-9999-999999999999', household_id: '99999999-9999-9999-9999-999999999999', first_name: 'Charlotte', last_name: 'Brown', birth_date: '2016-12-05', status: 'active' },
    { id: 'a9999999-9999-9999-9999-999999999990', household_id: '99999999-9999-9999-9999-999999999999', first_name: 'James', last_name: 'Brown', birth_date: '2012-03-28', status: 'active' },
    // Expired
    { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', household_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', first_name: 'Benjamin', last_name: 'Taylor', birth_date: '2014-07-09', status: 'active' },
    { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', household_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', first_name: 'Amelia', last_name: 'Davis', birth_date: '2015-09-16', status: 'active' },
    // Inactive
    { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', household_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', first_name: 'Alexander', last_name: 'Wilson', birth_date: '2013-11-21', status: 'inactive' },
    // Pending ACH
    { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', household_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', first_name: 'Harper', last_name: 'Moore', birth_date: '2016-05-24', status: 'active' },
    // Adult/Collegiate
    { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', household_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', first_name: 'Michael', last_name: 'Thomas', birth_date: '1985-04-12', status: 'active' },
    { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', household_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', first_name: 'Alex', last_name: 'Rodriguez', birth_date: '2002-09-08', status: 'active' }
  ],

  memberships: [
    // Active (paid through 2027-Q1)
    { member_id: 'a1111111-1111-1111-1111-111111111111', program_id: 'cobras', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    { member_id: 'a1111111-1111-1111-1111-111111111112', program_id: 'warriors', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    { member_id: 'a2222222-2222-2222-2222-222222222222', program_id: 'little_judokas', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    { member_id: 'a3333333-3333-3333-3333-333333333333', program_id: 'warriors', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    { member_id: 'a3333333-3333-3333-3333-333333333334', program_id: 'cobras', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    // Expiring today (2026-09-30)
    { member_id: 'a4444444-4444-4444-4444-444444444444', program_id: 'cobras', term_id: '2026-Q3', plan: 'quarter', start_date: '2026-07-01', end_date: '2026-09-30', status: 'paid' },
    { member_id: 'a5555555-5555-5555-5555-555555555555', program_id: 'warriors', term_id: '2026-Q3', plan: 'quarter', start_date: '2026-07-01', end_date: '2026-09-30', status: 'paid' },
    // Expiring 7 days (2026-10-09)
    { member_id: 'a6666666-6666-6666-6666-666666666666', program_id: 'little_judokas', term_id: '2026-Q3-EXT', plan: 'quarter', start_date: '2026-07-10', end_date: '2026-10-09', status: 'paid' },
    { member_id: 'a6666666-6666-6666-6666-666666666667', program_id: 'cobras', term_id: '2026-Q3-EXT', plan: 'quarter', start_date: '2026-07-10', end_date: '2026-10-09', status: 'paid' },
    { member_id: 'a7777777-7777-7777-7777-777777777777', program_id: 'cobras', term_id: '2026-Q3-EXT', plan: 'quarter', start_date: '2026-07-10', end_date: '2026-10-09', status: 'paid' },
    // Expiring 30 days (2026-12-31)
    { member_id: 'a8888888-8888-8888-8888-888888888888', program_id: 'warriors', term_id: '2026-Q4', plan: 'quarter', start_date: '2026-10-01', end_date: '2026-12-31', status: 'paid' },
    { member_id: 'a9999999-9999-9999-9999-999999999999', program_id: 'little_judokas', term_id: '2026-Q4', plan: 'quarter', start_date: '2026-10-01', end_date: '2026-12-31', status: 'paid' },
    { member_id: 'a9999999-9999-9999-9999-999999999990', program_id: 'warriors', term_id: '2026-Q4', plan: 'quarter', start_date: '2026-10-01', end_date: '2026-12-31', status: 'paid' },
    // Expired (ended 2026-09-30)
    { member_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', program_id: 'warriors', term_id: '2026-Q3', plan: 'quarter', start_date: '2026-07-01', end_date: '2026-09-30', status: 'paid' },
    { member_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', program_id: 'cobras', term_id: '2026-Q3', plan: 'quarter', start_date: '2026-07-01', end_date: '2026-09-30', status: 'paid' },
    // Inactive (old year membership)
    { member_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', program_id: 'warriors', term_id: '2026-Y', plan: 'year', start_date: '2026-01-01', end_date: '2026-12-31', status: 'paid' },
    // Pending ACH
    { member_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', program_id: 'little_judokas', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'pending' },
    // Adult/Collegiate
    { member_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', program_id: 'adult_rec', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' },
    { member_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', program_id: 'collegiate', term_id: '2027-Q1', plan: 'quarter', start_date: '2027-01-01', end_date: '2027-03-31', status: 'paid' }
  ],

  orders: [
    // Active
    { id: 'o1111111-1111-1111-1111-111111111111', household_id: '11111111-1111-1111-1111-111111111111', source: 'stripe', status: 'paid', amount_cents: 152500, payment_method_type: 'card', paid_at: '2026-10-01T10:30:00Z' },
    { id: 'o2222222-2222-2222-2222-222222222222', household_id: '22222222-2222-2222-2222-222222222222', source: 'zelle', status: 'paid', amount_cents: 73500, paid_at: '2026-09-28T14:15:00Z' },
    { id: 'o3333333-3333-3333-3333-333333333333', household_id: '33333333-3333-3333-3333-333333333333', source: 'stripe', status: 'paid', amount_cents: 152500, payment_method_type: 'us_bank_account', paid_at: '2026-09-25T09:45:00Z' },
    // Expiring today
    { id: 'o4444444-4444-4444-4444-444444444444', household_id: '44444444-4444-4444-4444-444444444444', source: 'cash', status: 'paid', amount_cents: 73500, paid_at: '2026-07-01T00:00:00Z' },
    { id: 'o5555555-5555-5555-5555-555555555555', household_id: '55555555-5555-5555-5555-555555555555', source: 'check', status: 'paid', amount_cents: 87500, reference: 'Check #1234', paid_at: '2026-07-01T00:00:00Z' },
    // Expiring 7 days
    { id: 'o6666666-6666-6666-6666-666666666666', household_id: '66666666-6666-6666-6666-666666666666', source: 'venmo', status: 'paid', amount_cents: 139000, paid_at: '2026-07-10T16:20:00Z' },
    { id: 'o7777777-7777-7777-7777-777777777777', household_id: '77777777-7777-7777-7777-777777777777', source: 'stripe', status: 'paid', amount_cents: 73500, payment_method_type: 'card', paid_at: '2026-07-10T11:00:00Z' },
    // Expiring 30 days
    { id: 'o8888888-8888-8888-8888-888888888888', household_id: '88888888-8888-8888-8888-888888888888', source: 'stripe', status: 'paid', amount_cents: 87500, payment_method_type: 'us_bank_account', paid_at: '2026-08-01T13:45:00Z' },
    { id: 'o9999999-9999-9999-9999-999999999999', household_id: '99999999-9999-9999-9999-999999999999', source: 'zelle', status: 'paid', amount_cents: 139000, paid_at: '2026-08-02T10:00:00Z' },
    // Expired
    { id: 'oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', household_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', source: 'stripe', status: 'paid', amount_cents: 87500, payment_method_type: 'card', paid_at: '2026-04-01T09:30:00Z' },
    { id: 'obbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', household_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', source: 'cash', status: 'paid', amount_cents: 73500, paid_at: '2026-01-05T00:00:00Z' },
    // Inactive
    { id: 'occcccccc-cccc-cccc-cccc-cccccccccccc', household_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', source: 'stripe', status: 'paid', amount_cents: 237500, payment_method_type: 'card', paid_at: '2026-01-02T10:00:00Z' },
    // Pending ACH
    { id: 'odddddddd-dddd-dddd-dddd-dddddddddddd', household_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', source: 'stripe', status: 'processing', amount_cents: 73500, payment_method_type: 'us_bank_account', created_at: '2026-10-01T14:00:00Z' },
    // Adult/Collegiate
    { id: 'oeeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', household_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', source: 'stripe', status: 'paid', amount_cents: 65000, payment_method_type: 'us_bank_account', paid_at: '2026-10-01T08:00:00Z' },
    { id: 'offffffff-ffff-ffff-ffff-ffffffffffff', household_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', source: 'venmo', status: 'paid', amount_cents: 74000, paid_at: '2026-09-30T12:00:00Z' }
  ]
};

// Helper function to compute member status (mimics the SQL view)
export function computeMemberStatus() {
  const currentDate = new Date(demoData.currentDate);
  
  return demoData.members.map(member => {
    const household = demoData.households.find(h => h.id === member.household_id);
    const memberMemberships = demoData.memberships.filter(m => m.member_id === member.id && m.status === 'paid');
    
    let last_paid_end = null;
    let current_term_end = null;
    let has_future_term = false;
    let has_pending = false;
    
    memberMemberships.forEach(ms => {
      const endDate = new Date(ms.end_date);
      const startDate = new Date(ms.start_date);
      
      if (!last_paid_end || endDate > last_paid_end) {
        last_paid_end = endDate;
      }
      
      if (startDate <= currentDate && (!current_term_end || endDate > current_term_end)) {
        current_term_end = endDate;
      }
      
      if (startDate > currentDate) {
        has_future_term = true;
      }
    });
    
    // Check for pending memberships
    const pendingMemberships = demoData.memberships.filter(m => m.member_id === member.id && m.status === 'pending');
    has_pending = pendingMemberships.length > 0;
    
    let days_left = null;
    let bucket = 'never_paid';
    
    if (last_paid_end) {
      days_left = Math.floor((last_paid_end - currentDate) / (1000 * 60 * 60 * 24));
      
      if (member.status === 'archived') {
        bucket = 'archived';
      } else if (member.status === 'inactive') {
        bucket = 'expired';
      } else if (last_paid_end < currentDate) {
        bucket = 'expired';
      } else if (days_left === 0) {
        bucket = 'expires_today';
      } else if (days_left <= 7) {
        bucket = 'expiring_7';
      } else if (days_left <= 30) {
        bucket = 'expiring_30';
      } else {
        bucket = 'active';
      }
    }
    
    // Get program info
    const activeMembership = memberMemberships.find(m => {
      const start = new Date(m.start_date);
      const end = new Date(m.end_date);
      return start <= currentDate && end >= currentDate;
    });
    
    const program = activeMembership ? demoData.programs.find(p => p.id === activeMembership.program_id) : null;
    
    return {
      ...member,
      household_name: household.name,
      email: household.email,
      phone: household.phone,
      last_paid_end: last_paid_end ? last_paid_end.toISOString().split('T')[0] : null,
      current_term_end: current_term_end ? current_term_end.toISOString().split('T')[0] : null,
      has_future_term,
      has_pending,
      days_left,
      bucket,
      program_name: program ? program.name : null,
      program_id: activeMembership ? activeMembership.program_id : null,
      plan: activeMembership ? activeMembership.plan : null
    };
  });
}

// Demo user sessions (for fake login)
export const demoUsers = {
  parent: {
    id: 'parent-user-id',
    email: 'sarah.anderson@example.com',
    role: 'guardian',
    household_id: '11111111-1111-1111-1111-111111111111'
  },
  admin: {
    id: 'admin-user-id',
    email: 'admin@cohensjudoclub.com',
    role: 'admin',
    household_id: null
  }
};
