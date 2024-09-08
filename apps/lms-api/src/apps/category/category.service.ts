import categoryRepository from "./category.repository";
import type { NewCategory } from "./category.schema";

const createCategory = async (category: NewCategory) => {
  const newCategory = await categoryRepository.create(category);
  return newCategory;
};

const findAllCategories = async () => {
  const categories = await categoryRepository.findAll();
  return categories;
};

const findCategoryById = async (categoryId: number) => {
  const category = await categoryRepository.findById(categoryId);
  return category.length !== 0 ? category[0] : null;
};

const findCategoryByName = async (name: string) => {
  const category = await categoryRepository.findByName(name);
  return category.length !== 0 ? category[0] : null;
};

const deleteCategoryById = async (categoryId: number) => {
  const category = await categoryRepository.deleteById(categoryId);
  return category.length !== 0 ? category[0] : null;
};

const updateCategoryById = async (
  categoryId: number,
  updateFields: Partial<NewCategory>
) => {
  const category = await categoryRepository.updateById(
    categoryId,
    updateFields
  );
  return category.length !== 0 ? category[0] : null;
};

export default {
  createCategory,
  findAllCategories,
  findCategoryById,
  findCategoryByName,
  deleteCategoryById,
  updateCategoryById,
};
