import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create MySQL Pool
 */
export const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "NewPassword123!",
  database: process.env.DB_NAME || "jaspilite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
/**
 * Execute Query Helper
 */
export async function executeQuery<T = any>(
  query: string,
  params: any[] = [],
): Promise<T> {
  try {
    const [rows] = await mySqlPool.query(query, params);
    return rows as T;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  }
}
