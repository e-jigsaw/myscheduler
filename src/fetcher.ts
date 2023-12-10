import { RadikoPack, TextPack } from "./types";
import { Config } from "../config";
import { postMessage } from "./postMessage";

const unwrapText = (text: TextPack) => {
  return text["#text"];
};

export const fetcher = async ({ name, isOverMidnight, kind }: Config) => {
  const res = await fetch(
    `${Bun.env.JGS_STATION}/api/proxy?d=${
      isOverMidnight ? new Date().getTime() - 86400000 : new Date().getTime()
    }`
  );
  const data = await res.json();
  if (data.ok) {
    for (const program of (data.data as RadikoPack).radiko.stations.station[0]
      .progs.prog) {
      if (unwrapText(program.title) === name) {
        const body = {
          ft: program.ft,
          title: unwrapText(program.title),
          id: program.id,
        };
        let dest;
        switch (kind) {
          case "yky": {
            dest = Bun.env.YKY_STATION;
            break;
          }
          case "jgs": {
            dest = Bun.env.JGS_STATION;
            break;
          }
        }
        postMessage(
          `config: ${name},${isOverMidnight},${kind} / body: ${JSON.stringify(
            body
          )}`
        );
        const r = await fetch(`${dest}/api/save`, {
          method: "POST",
          body: JSON.stringify(body),
        });
        const d = await r.json();
        console.log(d);
      }
    }
  }
};
