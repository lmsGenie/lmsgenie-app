import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HttpStatusCode } from "@/utils/constants";
import CustomError from "@/utils/customError";
import categoryService from "./category.service";
import categoryValidation from "./category.validation";

const categoryRouter = new Hono();

/**
 * @CREATE_CATEGORY
 * @ROUTE {{URL}}/api/v1/categories
 * @METHOD POST
 * @DESC Create a category
 */
categoryRouter.post(
  "/",
  zValidator("json", categoryValidation.createCategorySchema),
  async (c) => {
    const { name, parentId } = c.req.valid("json");

    // check if a valid parent id
    if (parentId) {
      const parentCategory = await categoryService.findCategoryById(parentId);

      if (!parentCategory) {
        throw new CustomError(
          "Parent category not found",
          HttpStatusCode.BadRequest,
          "category/parent-not-found"
        );
      }
    }

    // check if the category name is valid
    const existingCategory = await categoryService.findCategoryByName(name);
    if (existingCategory) {
      throw new CustomError(
        "Category name already exists",
        HttpStatusCode.BadRequest,
        "category/invalid-name"
      );
    }

    // create category
    const category = await categoryService.createCategory({ name, parentId });

    return c.json({
      success: true,
      message: "Category created successfully",
      category: category,
    });
  }
);

/**
 * @GET_ALL_CATEGORIES
 * @ROUTE {{URL}}/api/v1/admin/categories
 * @METHOD GET
 * @DESC Get all categories
 */
categoryRouter.get("/", async (c) => {
  const categories = await categoryService.findAllCategories();

  return c.json({
    success: true,
    message: "Categories fetched successfully",
    categories: categories,
  });
});

/**
 * @GET_CATEGORY_BY_ID
 * @ROUTE {{URL}}/api/v1/admin/categories/:categoryId
 * @METHOD GET
 * @DESC Get category by id
 */
categoryRouter.get(
  "/:categoryId",
  zValidator("param", categoryValidation.getCategoryByIdSchema),
  async (c) => {
    const { categoryId } = c.req.valid("param");
    const category = await categoryService.findCategoryById(categoryId);

    // check if a valid category
    if (!category) {
      throw new CustomError(
        "Category not found",
        HttpStatusCode.BadRequest,
        "category/not-found"
      );
    }

    return c.json({
      success: true,
      message: "Category fetched successfully",
      category: category,
    });
  }
);

/**
 * @DEL_CATEGORY_BY_ID
 * @ROUTE {{URL}}/api/v1/admin/categories/:categoryId
 * @METHOD DELETE
 * @DESC Delete category by id
 */
categoryRouter.delete(
  "/:categoryId",
  zValidator("param", categoryValidation.deleteCategoryByIdSchema),
  async (c) => {
    const { categoryId } = c.req.valid("param");
    const categoryExists = await categoryService.findCategoryById(categoryId);

    // check if a valid category
    if (!categoryExists) {
      throw new CustomError(
        "Category not found",
        HttpStatusCode.BadRequest,
        "category/not-found"
      );
    }

    const category = await categoryService.deleteCategoryById(categoryId);

    return c.json({
      success: true,
      message: "Category deleted successfully",
      category: category,
    });
  }
);

/**
 * @UPDATE_CATEGORY
 * @ROUTE {{URL}}/api/v1/categories
 * @METHOD PUT
 * @DESC Update a category
 */
categoryRouter.put(
  "/:categoryId",
  zValidator("json", categoryValidation.updateCategorySchema.body),
  zValidator("param", categoryValidation.updateCategorySchema.param),
  async (c) => {
    const { categoryId } = c.req.valid("param");
    const { name, parentId } = c.req.valid("json");

    // check if category exists
    const category = await categoryService.findCategoryById(categoryId);

    // check if a valid category
    if (!category) {
      throw new CustomError(
        "Category not found",
        HttpStatusCode.BadRequest,
        "category/not-found"
      );
    }

    // check if a valid parent id
    if (parentId) {
      const parentCategory = await categoryService.findCategoryById(parentId);

      if (!parentCategory) {
        throw new CustomError(
          "Parent category not found",
          HttpStatusCode.BadRequest,
          "category/parent-not-found"
        );
      }
    }

    // check if the category name is valid
    if (name) {
      const existingCategory = await categoryService.findCategoryByName(name);
      if (existingCategory) {
        throw new CustomError(
          "Category name already exists",
          HttpStatusCode.BadRequest,
          "category/invalid-name"
        );
      }
    }

    const updateFields = {
      ...(name && { name }),
      ...(parentId && { parentId }),
    };

    // update category
    const updatedCategory = await categoryService.updateCategoryById(
      category.id,
      updateFields
    );

    return c.json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  }
);

export default categoryRouter;
