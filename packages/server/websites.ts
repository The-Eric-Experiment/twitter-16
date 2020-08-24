import { Express, NextFunction, Request, Response } from "express";
import { Route } from "@retro-web/view";

export type WebsiteOptions = {
  staticFilesPath?: string;
};

function wrapHandler(
  fn: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response, next?: NextFunction) => any {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).then(next).catch(next);
  };
}

export function website(
  app: Express,
  routes: Route[],
  options?: WebsiteOptions
) {
  routes.forEach((route) => {
    const loadData = (requestType: "GET" | "POST") =>
      wrapHandler(async (req, res) => {
        const response = route({
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
    app.get(route.route, loadData("GET"));
    app.post(route.route, loadData("POST"));
  });

  if (options && options.staticFilesPath) {
    app.get(["/static/*"].join(""), (req, res) => {
      const path = req.params[0] ? req.params[0] : "index.html";
      res.sendFile(path, { root: options.staticFilesPath });
    });
  }
}
