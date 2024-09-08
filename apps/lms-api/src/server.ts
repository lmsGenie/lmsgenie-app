import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import sampleRoutes from "./apps/sample/sample.route";
import CONFIG from "./config";
import { HttpStatusCode } from "./utils/constants";

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

// global routes
app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: `Route not found ${c.req.path}`,
    },
    HttpStatusCode.NotFound,
  );
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      success: false,
      message: "Interal Server Error",
    },
    HttpStatusCode.InternalServerError,
  );
});

export default {
  port: CONFIG.PORT,
  fetch: app.fetch,
};
