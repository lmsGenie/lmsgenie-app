import sampleRepository from "./sample.repository";
import type { NewUser } from "./sample.schema";

const createUser = async (user: NewUser) => {
  const newUser = await sampleRepository.create(user);
  return newUser;
};

const getAllUsers = async () => {
  const users = await sampleRepository.getAll();
  return users;
};

export default {
  createUser,
  getAllUsers,
};
