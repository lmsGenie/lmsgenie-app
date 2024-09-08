import { z } from "zod";

// Body schema
const bodySchema = z.object({
  name: z.string(),
  parentId: z.number().optional().nullable(),
});

// Param schema
const paramSchema = z.object({
  categoryId: z.number({ coerce: true }),
});

// Create category schema
const createCategorySchema = bodySchema;

// Get category schema
const getCategoryByIdSchema = paramSchema;

// delete category schema
const deleteCategoryByIdSchema = paramSchema;

// Update category schema
const updateCategorySchema = {
  body: bodySchema.partial(),
  param: paramSchema,
};

export default {
  createCategorySchema,
  getCategoryByIdSchema,
  deleteCategoryByIdSchema,
  updateCategorySchema,
};
