-- ====================================================================
-- Jaspilite Production Database Cleanup SQL Script
-- 
-- Preserves:
--  1) 1 Super Administrator account in `adminusers`
--  2) All Master Categories in `product_category` (112 categories)
--  3) All Master Products in `products` (13,239 items)
--  4) System Lookups (`payment_gateways`, `delivery_vendors`)
--
-- Cleans/Resets:
--  - All dummy shops & branches
--  - All branch inventories, test orders, sales details
--  - All test customer accounts, vouchers, promotions
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Reset Branch & Shop Inventory / Orders
TRUNCATE TABLE `payment_gateway_vs_branches`;
TRUNCATE TABLE `delivery_vendor_vs_branches`;
TRUNCATE TABLE `promotion_items`;
TRUNCATE TABLE `promotions`;
TRUNCATE TABLE `users_vouchers`;
TRUNCATE TABLE `vouchers`;
TRUNCATE TABLE `sales_details`;
TRUNCATE TABLE `sales_history`;
TRUNCATE TABLE `sales_status`;
TRUNCATE TABLE `sales`;
TRUNCATE TABLE `shop_items`;

-- 2. Reset Shops and Branches
TRUNCATE TABLE `branches`;
TRUNCATE TABLE `shops`;

-- 3. Reset App Customer Dummy Accounts & Addresses (leave fresh for production users)
TRUNCATE TABLE `users_addresses`;
TRUNCATE TABLE `users_devices`;
TRUNCATE TABLE `redemptions`;
TRUNCATE TABLE `points`;
TRUNCATE TABLE `users`;

-- 4. Reset Admin Accounts to exactly 1 Super Admin
-- Note: Replace password hash with your desired bcrypt hash, or use test password (Test@123)
-- Bcrypt hash for 'Test@123': $2a$10$WqUeL8d3u7kH/J1WbS190u8vX59G2jQeW58eBfW/P86zQ8eS9.Lqy
DELETE FROM `adminusers`;

INSERT INTO `adminusers` (
    `user_type`,
    `displayName`,
    `email`,
    `password`,
    `status`,
    `shop_id`,
    `branch_id`
) VALUES (
    'sadmin',
    'Super Administrator',
    'admin@jaspilite.com',
    '$2a$10$WqUeL8d3u7kH/J1WbS190u8vX59G2jQeW58eBfW/P86zQ8eS9.Lqy',
    'active',
    0,
    0
);

SET FOREIGN_KEY_CHECKS = 1;

-- Verification Queries:
SELECT 'product_category' AS `table`, COUNT(*) AS `count` FROM `product_category`
UNION ALL SELECT 'products', COUNT(*) FROM `products`
UNION ALL SELECT 'adminusers', COUNT(*) FROM `adminusers`
UNION ALL SELECT 'shops', COUNT(*) FROM `shops`
UNION ALL SELECT 'branches', COUNT(*) FROM `branches`;
