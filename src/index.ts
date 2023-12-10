import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import { config } from "../config";
import { fetcher } from "./fetcher";

const app = new Elysia();

for (const c of config) {
  app.use(
    cron({
      name: c.name,
      pattern: c.pattern,
      async run() {
        fetcher(c);
      },
    })
  );
}

app.get("/", () => "It works!");

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
