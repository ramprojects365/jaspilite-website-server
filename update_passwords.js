const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function run() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'NewPassword123!',
    database: 'jaspilite',
  });

  const hash = await bcrypt.hash('Test@123', 10);
  console.log('Generated hash:', hash);

  await pool.execute("UPDATE adminusers SET password = ? WHERE id IN (417, 418)", [hash]);
  const [rows] = await pool.execute("SELECT id, displayName, email, user_type, password FROM adminusers WHERE id IN (417, 418)");
  console.log('Updated users:', rows);
  await pool.end();
}

run().catch(console.error);
