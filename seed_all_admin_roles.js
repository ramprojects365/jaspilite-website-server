const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seedAndVerifyAllAdmins() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'NewPassword123!',
    database: process.env.DB_NAME || 'jaspilite'
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('Test@123', salt);

  const testAccounts = [
    { role: 'sadmin', email: 'test.sadmin@jaspilite.com', name: 'Test Super Admin', shop_id: 0, branch_id: 0 },
    { role: 'nadmin', email: 'test.nadmin@jaspilite.com', name: 'Test Normal Admin', shop_id: 1, branch_id: 1 },
    { role: 'manager', email: 'test.manager@jaspilite.com', name: 'Test Branch Manager', shop_id: 1, branch_id: 1 },
    { role: 'padmin', email: 'test.padmin@jaspilite.com', name: 'Test Packing Admin', shop_id: 1, branch_id: 1 },
    { role: 'employee', email: 'test.employee@jaspilite.com', name: 'Test Employee Cashier', shop_id: 1, branch_id: 1 }
  ];

  for (const acc of testAccounts) {
    const [existing] = await conn.query('SELECT id, email, user_type FROM adminusers WHERE email = ?', [acc.email]);
    if (existing.length > 0) {
      await conn.query(
        'UPDATE adminusers SET password = ?, displayName = ?, status = "active", shop_id = ?, branch_id = ? WHERE email = ?',
        [hash, acc.name, acc.shop_id, acc.branch_id, acc.email]
      );
      console.log(`Updated test account [${acc.role}]: ${acc.email} (ID: ${existing[0].id})`);
    } else {
      const [res] = await conn.query(
        'INSERT INTO adminusers (user_type, displayName, email, password, status, shop_id, branch_id) VALUES (?, ?, ?, ?, "active", ?, ?)',
        [acc.role, acc.name, acc.email, hash, acc.shop_id, acc.branch_id]
      );
      console.log(`Created test account [${acc.role}]: ${acc.email} (ID: ${res.insertId})`);
    }
  }

  console.log('\n--- VERIFYING ADMIN LOGINS ---');
  for (const acc of testAccounts) {
    const res = await fetch('http://localhost:3005/api/v2/admin/web/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: acc.email, password: 'Test@123' })
    });
    const data = await res.json();
    console.log(`Login [${acc.role}] (${acc.email}): HTTP ${res.status} | Role in token: ${data.payload?.admin_user?.user_type}`);
  }

  await conn.end();
}

seedAndVerifyAllAdmins().catch(console.error);
