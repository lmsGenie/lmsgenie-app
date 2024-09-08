declare module "bun" {
  interface Env {
    PORT: number;
    NEON_DATABASE_URL: string;
  }
}

const CONFIG = {
  PORT: process.env.PORT,
  NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
};

export default CONFIG;
