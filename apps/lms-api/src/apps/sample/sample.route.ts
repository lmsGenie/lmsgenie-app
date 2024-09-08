import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import sampleService from "./sample.service";
import sampleValidation from "./sample.validation";

const sampleRoutes = new Hono();

/**
 * @CREATE_USER
 * @ROUTE {{URL}}/api/v1/sample
 * @METHOD POST
 * @ACCESS public
 * @DESC Create a sample user
 */
sampleRoutes.post(
  "/",
  zValidator("json", sampleValidation.createUserSchema),
  async (c) => {
    const { email, name } = c.req.valid("json");
    const user = await sampleService.createUser({ email, name });

    return c.json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  },
);

/**
 * @GET_ALL_USERS
 * @ROUTE {{URL}}/api/v1/sample
 * @METHOD GET
 * @ACCESS public
 * @DESC Get all users
 */
sampleRoutes.get("/", async (c) => {
  const users = await sampleService.getAllUsers();
  return c.json({
    success: true,
    message: "User fetched successfully",
    users: users,
  });
});

export default sampleRoutes;
