import { initDb } from "../config/db.js";
import { pool } from "../config/db.js";

const runMigration = async () => {
  console.log("Migration started");

  await initDb();

  await pool.end();

  console.log("Migration ended");
  
};

runMigration()
