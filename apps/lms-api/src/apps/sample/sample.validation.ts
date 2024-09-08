import { z } from "zod";

// Body schema
const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
});

// Create user schema
const createUserSchema = bodySchema;

// Get user schema
const getUserSchema = bodySchema.partial();

export default {
  createUserSchema,
  getUserSchema,
};
