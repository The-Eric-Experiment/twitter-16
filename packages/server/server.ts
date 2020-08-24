import { Route } from "@retro-web/view";
import axios from "axios";
import { urlencoded } from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as session from "express-session";
import * as sharp from "sharp";
import { website, WebsiteOptions } from "./websites";

export function server(
  appName: string,
  routes: Route[],
  options?: WebsiteOptions
) {
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(cookieParser());
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "oldstuff",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, httpOnly: true },
    })
  );

  app.use(urlencoded({ extended: true }));

  app.get("/img/:width/:height", async (req, res) => {
    const url = req.query.url as string;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const result = await sharp(response.data as Buffer)
      .resize(width, height, {
        fit: "cover",
      })
      .jpeg({
        quality: 50,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    res.type("jpg");
    res.send(result);
  });

  website(app, routes, options);

  app.listen(port, () =>
    console.log(`${appName} listening at http://localhost:${port}`)
  );

  return app;
}
