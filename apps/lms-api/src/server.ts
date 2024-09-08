import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import categoryRouter from "@/apps/category/category.route";
import sampleRoutes from "@/apps/sample/sample.route";
import CONFIG from "@/config/index";
import { HttpStatusCode } from "@/utils/constants";

const app = new Hono();

// 3rd party middlewares
app.use(logger());
app.use(secureHeaders());
app.use(prettyJSON());
app.use(cors());
app.use(csrf());
app.use(timing());

// api routes
app.get("/health", (c) => {
  return c.json({
    success: true,
    message: "ok",
  });
});

app.route("/sample", sampleRoutes);

// admin routes
app.route("/categories", categoryRouter);

// global routes
app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: `Route not found ${c.req.path}`,
    },
    HttpStatusCode.NotFound
  );
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
app.onError((err: any, c) => {
  console.error(`${err}`);
  const statusCode = err.statusCode || HttpStatusCode.InternalServerError;
  const errorMessage = err.message || "Internal Server Error";
  const errorCode = err.errorCode || "unknown";
  return c.json(
    {
      success: false,
      message: errorMessage,
      code: errorCode,
    },
    statusCode
  );
});

export default {
  port: CONFIG.PORT,
  fetch: app.fetch,
};
