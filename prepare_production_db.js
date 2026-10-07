/**
 * Jaspilite Database Production Preparation Script
 * 
 * Purpose:
 * - Keeps 1 Super Admin account (with customized email & hashed password)
 * - Keeps all Product Categories (product_category)
 * - Keeps all Master Products (products)
 * - Keeps System Tables (payment_gateways, delivery_vendors)
 * - Removes dummy/test data: shops, branches, shop_items, sales, promotions, vouchers, customer test accounts
 * 
 * Usage:
 *   Preview (Dry Run, does NOT modify data):
 *     node prepare_production_db.js --dry-run
 * 
 *   Execute cleanup:
 *     node prepare_production_db.js --execute --email="admin@yourdomain.com" --password="YourSecurePassword!" --name="Super Admin"
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || !args.includes('--execute');
const emailArg = args.find(a => a.startsWith('--email='))?.split('=')[1] || 'admin@jaspilite.com';
const passwordArg = args.find(a => a.startsWith('--password='))?.split('=')[1] || 'Jaspilite@2026!';
const nameArg = args.find(a => a.startsWith('--name='))?.split('=')[1] || 'Super Administrator';

async function main() {
  console.log('====================================================');
  console.log('   JASPILITE PRODUCTION DATABASE CLEANUP UTILITY    ');
  console.log('====================================================');
  console.log(`Mode:            ${isDryRun ? 'DRY RUN (Preview Only - No data modified)' : '*** LIVE EXECUTION ***'}`);
  console.log(`Preserved Admin: ${emailArg} (${nameArg})`);
  console.log('----------------------------------------------------\n');

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'NewPassword123!',
    database: process.env.DB_NAME || 'jaspilite'
  });

  try {
    // 1. Current Stats
    console.log('📊 Current Database Snapshot:');
    const tablesToClean = [
      'adminusers',
      'shops',
      'branches',
      'shop_items',
      'sales',
      'sales_details',
      'sales_history',
      'sales_status',
      'promotions',
      'promotion_items',
      'vouchers',
      'users_vouchers',
      'payment_gateway_vs_branches',
      'delivery_vendor_vs_branches',
      'users',
      'users_addresses',
      'users_devices',
      'redemptions',
      'points'
    ];

    const tablesToKeep = [
      'product_category',
      'products',
      'payment_gateways',
      'delivery_vendors'
    ];

    for (const tbl of [...tablesToKeep, ...tablesToClean]) {
      try {
        const [cnt] = await conn.query(`SELECT COUNT(*) as c FROM \`${tbl}\``);
        const marker = tablesToKeep.includes(tbl) ? ' [KEEP ALL]' : ' [WILL CLEAN/RESET]';
        console.log(`   - ${tbl.padEnd(30)} : ${cnt[0].c.toLocaleString()} rows${marker}`);
      } catch (err) {
        // table might not exist, ignore
      }
    }

    if (isDryRun) {
      console.log('\n⚠️  DRY RUN COMPLETED. No data was modified.');
      console.log('To perform the actual cleanup, run:');
      console.log(`   node prepare_production_db.js --execute --email="${emailArg}" --password="${passwordArg}" --name="${nameArg}"\n`);
      return;
    }

    console.log('\n⏳ Beginning clean execution...');

    // Disable foreign key checks for clean truncation
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');

    // 2. Clear branch-dependent & dummy operational tables
    const tablesToTruncate = [
      'payment_gateway_vs_branches',
      'delivery_vendor_vs_branches',
      'promotion_items',
      'promotions',
      'users_vouchers',
      'vouchers',
      'sales_details',
      'sales_history',
      'sales_status',
      'sales',
      'shop_items',
      'branches',
      'shops',
      'users_addresses',
      'users_devices',
      'redemptions',
      'points',
      'users'
    ];

    for (const tbl of tablesToTruncate) {
      try {
        await conn.query(`TRUNCATE TABLE \`${tbl}\``);
        console.log(`   ✓ Truncated table: ${tbl}`);
      } catch (err) {
        console.log(`   ! Notice on ${tbl}: ${err.message}`);
      }
    }

    // 3. Reset Admin Users -> Keep exactly 1 super admin
    await conn.query('DELETE FROM `adminusers`');
    const hash = await bcrypt.hash(passwordArg, 10);
    const [insertResult] = await conn.query(
      'INSERT INTO `adminusers` (user_type, displayName, email, password, status, shop_id, branch_id) VALUES (?, ?, ?, ?, "active", 0, 0)',
      ['sadmin', nameArg, emailArg, hash]
    );
    console.log(`   ✓ Admin users reset. Single Super Admin created (ID: ${insertResult.insertId})`);

    // Re-enable foreign key checks
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('\n====================================================');
    console.log('✅ PRODUCTION CLEANUP SUCCESSFUL!');
    console.log('====================================================');
    console.log('Summary:');
    console.log(`- Super Admin: ${emailArg} (Password: ${passwordArg})`);
    console.log('- Product Categories: Intact');
    console.log('- Master Products:    Intact');
    console.log('- Test Shops/Branches: Reset to 0 (clean slate for production)');
    console.log('====================================================\n');

  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
