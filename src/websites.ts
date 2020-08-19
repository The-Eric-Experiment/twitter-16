import { Express, NextFunction, Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import { Route } from "./types";

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
  ).filter((o) => [".ts", ".tsx", ".js"].includes(path.extname(o)));

  routes.forEach((route) => {
    const js = require(["../websites", website, route].join("/"));
    const component: Route = js.default;

    const appRoute = ["/", website, component.route].join("");
    const loadData = (requestType: "GET" | "POST") =>
      wrapHandler(async (req, res) => {
        const response = component({
          req,
          res,
          requestType,
        });

        let result: string = "";

        if (response instanceof Promise) {
          result = await response;
        } else {
          result = response;
        }

        if (!result) {
          return;
        }

        res.send(result);
      });
    app.get(appRoute, loadData("GET"));
    app.post(appRoute, loadData("POST"));
  });

  app.get(["/", website, "/static/*"].join(""), (req, res) => {
    const path = req.params[0] ? req.params[0] : "index.html";
    res.sendFile(path, { root: ["./websites", website, "static"].join("/") });
  });
}

export default (app: Express) => {
  return websites.map((site) => website(site, app));
};
