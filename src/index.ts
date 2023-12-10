import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import { config } from "../config";
import { fetcher } from "./fetcher";
import { postMessage } from "./postMessage";

const app = new Elysia();

for (const c of config) {
  app.use(
    cron({
      name: c.name,
      pattern: c.pattern,
      async run() {
        postMessage(`Start fetching ${c.name}`);
        await fetcher(c);
        postMessage(`Finished fetching ${c.name}`);
      },
    })
  );
}

app.get("/", () => "It works!");

app.listen(3000);
