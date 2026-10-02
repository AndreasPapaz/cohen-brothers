import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { demoData, computeMemberStatus } from './lib/demo-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API routes
  if (req.url.startsWith('/api/admin/members')) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const bucket = url.searchParams.get('bucket') || 'all';
    
    const memberStatuses = computeMemberStatus();
    let filteredMembers = memberStatuses;

    if (bucket !== 'all') {
      filteredMembers = memberStatuses.filter(m => m.bucket === bucket);
    }

    const response = {
      members: filteredMembers,
      counts: {
        active: memberStatuses.filter(m => m.bucket === 'active').length,
        expires_today: memberStatuses.filter(m => m.bucket === 'expires_today').length,
        expiring_7: memberStatuses.filter(m => m.bucket === 'expiring_7').length,
        expiring_30: memberStatuses.filter(m => m.bucket === 'expiring_30').length,
        expired: memberStatuses.filter(m => m.bucket === 'expired').length,
        pending: memberStatuses.filter(m => m.has_pending).length
      }
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    return;
  }

  if (req.url === '/api/admin/offline-payment' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      console.log('Payment recorded:', JSON.parse(body));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Payment recorded (demo mode)' }));
    });
    return;
  }

  if (req.url === '/api/admin/export') {
    const csv = 'Member Name,Program,End Date,Status\n' +
      computeMemberStatus().map(m => 
        `${m.first_name} ${m.last_name},${m.program_name || 'N/A'},${m.last_paid_end || 'N/A'},${m.bucket}`
      ).join('\n');
    
    res.writeHead(200, {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="members.csv"'
    });
    res.end(csv);
    return;
  }

  // Serve static files
  let filePath = req.url;
  
  // Handle directory URLs
  if (filePath === '/' || filePath.endsWith('/')) {
    filePath += 'index.html';
  }
  
  filePath = join(__dirname, filePath);

  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      console.error('Server error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n🥋 Demo server running at http://localhost:${PORT}\n`);
  console.log('Pages:');
  console.log(`  Homepage:        http://localhost:${PORT}/`);
  console.log(`  Pricing:         http://localhost:${PORT}/pricing.html`);
  console.log(`  Admin Dashboard: http://localhost:${PORT}/admin/`);
  console.log(`  Member Account:  http://localhost:${PORT}/account.html\n`);
});
