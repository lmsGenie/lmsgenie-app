import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import categoryTable, { type NewCategory } from "./category.schema";

const create = async (category: NewCategory) => {
  const result = await db.insert(categoryTable).values(category).returning();
  return result;
};

const findAll = async () => {
  const result = await db.select().from(categoryTable);
  return result;
};

const findById = async (id: number) => {
  const result = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.id, id));
  return result;
};

const findByName = async (name: string) => {
  const result = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.name, name));
  return result;
};

const deleteById = async (id: number) => {
  const result = await db
    .delete(categoryTable)
    .where(eq(categoryTable.id, id))
    .returning();
  return result;
};

const updateById = async (id: number, updateFields: Partial<NewCategory>) => {
  const result = await db
    .update(categoryTable)
    .set(updateFields)
    .where(eq(categoryTable.id, id))
    .returning();
  return result;
};

export default {
  create,
  findAll,
  findById,
  findByName,
  deleteById,
  updateById,
};
