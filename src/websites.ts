import { Express, NextFunction, Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import { RenderThis, RenderOpts } from "./types";

var normalizedPath = path.join(__dirname, "../websites");

const websites = fs.readdirSync(normalizedPath);

function wrapHandler(
  fn: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response, next?: NextFunction) => any {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).then(next).catch(next);
  };
}
function website(website: string, app: Express) {
  const routes = Array.from(
    new Set(fs.readdirSync(path.join(normalizedPath, website)))
  ).filter((o) => path.extname(o) === ".ts" || path.extname(o) === ".js");

  routes.forEach((route) => {
    const js = require(["../websites", website, route].join("/"));
    const definition: RenderOpts<unknown> = js.default || js;

    const appRoute = ["/", website, definition.route].join("");
    const svc: RenderThis<unknown> = {
      render: definition.render,
    };
    app.get(appRoute, wrapHandler(definition.get.bind(svc)));
    app.post(appRoute, wrapHandler(definition.post.bind(svc)));
  });

  app.get(["/", website, "/static/*"].join(""), (req, res) => {
    const path = req.params[0] ? req.params[0] : "index.html";
    res.sendFile(path, { root: ["./websites", website, "static"].join("/") });
  });
}

export default (app: Express) => {
  return websites.map((site) => website(site, app));
};
