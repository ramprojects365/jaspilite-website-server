const mysql = require('mysql2/promise');

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'NewPassword123!',
    database: process.env.DB_NAME || 'jaspilite'
  });

  const [roles] = await conn.query('SELECT user_type, COUNT(*) as count FROM adminusers GROUP BY user_type');
  console.log('--- ADMIN ROLES IN DB ---');
  console.table(roles);

  const [tableCounts] = await conn.query(`
    SELECT 'adminusers (Staff/Admins)' AS tbl, COUNT(*) AS count FROM adminusers
    UNION ALL SELECT 'shops (Merchants)', COUNT(*) FROM shops
    UNION ALL SELECT 'branches (Outlets)', COUNT(*) FROM branches
    UNION ALL SELECT 'products (Master Catalog)', COUNT(*) FROM products
    UNION ALL SELECT 'product_category (Categories)', COUNT(*) FROM product_category
    UNION ALL SELECT 'shop_items (Branch Inventory)', COUNT(*) FROM shop_items
    UNION ALL SELECT 'sales (Orders/Transactions)', COUNT(*) FROM sales
    UNION ALL SELECT 'sales_details (Line Items)', COUNT(*) FROM sales_details
    UNION ALL SELECT 'users (App Customers)', COUNT(*) FROM users
    UNION ALL SELECT 'users_addresses (Customer Addresses)', COUNT(*) FROM users_addresses
    UNION ALL SELECT 'promotions (Active Deals)', COUNT(*) FROM promotions
    UNION ALL SELECT 'vouchers (Discount Codes)', COUNT(*) FROM vouchers
    UNION ALL SELECT 'delivery_vendors (Logistics Partners)', COUNT(*) FROM delivery_vendors
    UNION ALL SELECT 'payment_gateways (Payment Processors)', COUNT(*) FROM payment_gateways
  `);
  console.log('--- DATABASE DATA TOTALS (FROM jaspilite-db) ---');
  console.table(tableCounts);

  await conn.end();
}

run().catch(console.error);
