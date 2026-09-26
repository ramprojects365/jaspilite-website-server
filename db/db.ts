import mysql from "mysql2/promise";
/**
 * Create MySQL Pool
 */
export const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "NewPassword123!",
  database: "minimart",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
/**
 * Execute Query Helper
 */
export async function executeQuery<T = any>(
  query: string,
  params: any[] = [],
): Promise<T> {
  try {
    const [rows] = await mySqlPool.execute(query, params);
    return rows as T;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  }
}
