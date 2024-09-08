import {
  type AnyPgColumn,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).unique().notNull(),
  parentId: integer("parent_id").references(
    (): AnyPgColumn => categoryTable.id,
    { onDelete: "cascade" }
  ),
});

export type Category = typeof categoryTable.$inferSelect;
export type NewCategory = typeof categoryTable.$inferInsert;
export default categoryTable;
