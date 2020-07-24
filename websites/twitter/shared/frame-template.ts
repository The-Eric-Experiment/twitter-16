import { trends } from "./trends-template";
import { sideMenu } from "./side-menu-template";
import { Profile, UserSettings, Trends } from "./types";
import { RenderThis } from "../../../src/types";
import page from "../../../src/page";
import { Request, Response } from "express";
import { getUserSettings, getUserProfile, getTrends } from "./api";

export type FrameModel = {
  profile: Profile;
  settings: UserSettings;
  trends: Trends;
};

export type RenderOpts<TModel> = {
  render(model: TModel): string;
  get(this: RenderThis<TModel>, req: Request, res: Response): Promise<TModel>;
  post(this: RenderThis<TModel>, req: Request, res: Response): Promise<TModel>;
};

export function frame<TModel = {}>(route: string, opts: RenderOpts<TModel>) {
  return page<FrameModel & TModel>(route, {
    render(model): string {
      return /*template*/ `
        <html>
        <head>
          <title>Twitter</title>
        </head>
        <body bgcolor="#ffffff" text="#000000" topmargin="0" leftmargin="0" rightmargin="0">
          <map name="mainmenu">
            <area shape="RECT" coords="1,0,300,66" href="/twitter/home">
            <area shape="RECT" coords="360,0,420,66" href="/twitter/home">
            <area shape="RECT" coords="421,0,481,66" href="/twitter/explore">
          </map>
          <table width="700" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td colspan="3">
                <img src="/twitter/static/header.jpg" usemap="#mainmenu" border="0" />
              </td>
            </tr>
      
            <tr>
              <td colspan="3" bgcolor="#F5F8FA"><marquee>Welcome to twitter!</marquee></td>
            </tr>

            <tr>
              <td><font colspan="3" size="1" color="#ffffff">a</font></td>
            </tr>
      
            <tr>
              <td width="120" fgcolor="#ffffff" valign="top">
                ${sideMenu(model.profile)}
              </td>
      
              <td valign="top">
                ${opts.render(model)}
              </td>
              <td valign="top" width="120">
                ${trends(model.trends)}
              </td>
            </tr>
            </table>
        </body>
        </html>
    `;
    },
    async get(req, res) {
      const accessToken = req.cookies.twitter_access_token;
      const accessTokenSecret = req.cookies.twitter_access_token_secret;
      if (!accessToken) {
        res.redirect("/twitter/login");
        return;
      }
      let model: FrameModel | undefined = req.session.twitter;
      if (!model) {
        const settings = await getUserSettings(accessToken, accessTokenSecret);
        const profile = await getUserProfile(
          settings.screen_name,
          accessToken,
          accessTokenSecret
        );
        const trends = await getTrends(
          settings.trend_location[0].woeid,
          accessToken,
          accessTokenSecret
        );

        model = req.session.twitter = { settings, profile, trends: trends[0] };

        req.session.save(() => {});
      }

      const get: (
        req: Request,
        res: Response
      ) => Promise<TModel> = opts.get.bind(this);
      const result = await get(req, res);
      if (result === null) {
        return;
      }

      res.type("html");
      res.send(
        this.render({
          ...model,
          ...result,
        })
      );
    },
    async post(req, res) {
      const accessToken = req.cookies.twitter_access_token;
      const accessTokenSecret = req.cookies.twitter_access_token_secret;
      if (!accessToken) {
        res.redirect("/twitter/login");
        return;
      }
      let model: FrameModel | undefined = req.session.twitter;
      if (!model) {
        const settings = await getUserSettings(accessToken, accessTokenSecret);
        const profile = await getUserProfile(
          settings.screen_name,
          accessToken,
          accessTokenSecret
        );
        const trends = await getTrends(
          settings.trend_location[0].woeid,
          accessToken,
          accessTokenSecret
        );

        model = req.session.twitter = { settings, profile, trends: trends[0] };

        req.session.save(() => {});
      }
      const post: (
        req: Request,
        res: Response
      ) => Promise<TModel> = opts.post.bind(this);

      const result = await post(req, res);
      if (result === null) {
        return;
      }

      res.type("html");
      res.send(
        this.render({
          ...model,
          ...result,
        })
      );
    },
  });
}
