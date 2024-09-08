import db from "@/db/drizzle";
import userTable, { type NewUser } from "./sample.schema";

const create = async (user: NewUser) => {
  const result = await db.insert(userTable).values(user).returning();
  return result;
};

const getAll = async () => {
  const result = await db.select().from(userTable);
  return result;
};

export default {
  create,
  getAll,
};
