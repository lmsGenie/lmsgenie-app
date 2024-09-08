import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import CONFIG from "../config";

const sql = neon(CONFIG.NEON_DATABASE_URL);
const db = drizzle(sql);

export default db;
