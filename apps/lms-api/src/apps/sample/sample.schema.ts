import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

const userTable = pgTable("user", {
  name: text("name").unique().notNull(),
  email: text("email").unique().notNull(),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
export default userTable;
