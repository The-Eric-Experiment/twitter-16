import { Response } from "express";
import { getTrends, getUserProfile, getUserSettings } from "../api";
import { SideMenu } from "./side-menu";
import { Trends } from "./trends";
import { Profile, Trends as TrendsData, UserSettings } from "../types";
import { Component, tag } from "@retro-web/view";
import { createModel } from "@retro-web/server";

export type FrameModel = {
  profile: Profile;
  settings: UserSettings;
  trends: TrendsData;
};

type FrameProps = {
  session: Express.Session;
  cookies: Record<string, string>;
  res: Response;
};

export const Frame: Component<FrameProps> = async ({
  children,
  session,
  cookies,
  res,
}) => {
  const model = await createModel<FrameModel | undefined>(async () => {
    const accessToken = cookies.twitter_access_token;
    const accessTokenSecret = cookies.twitter_access_token_secret;
    if (!accessToken) {
      res.redirect("/login");
      return undefined;
    }
    let model: FrameModel | undefined = session.twitter;

    if (!!model) {
      return model;
    }
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

    model = session.twitter = { settings, profile, trends: trends[0] };

    session.save(() => {});

    return model;
  });

  if (!model) {
    return undefined;
  }

  return (
    <html>
      <head>
        <title>Twitter</title>
      </head>
      <body
        bgcolor="#ffffff"
        text="#000000"
        topmargin={0}
        leftmargin={0}
        rightmargin={0}
      >
        <map name="mainmenu">
          <area shape="RECT" coords="1,0,300,66" href="/home" />
          <area shape="RECT" coords="360,0,420,66" href="/home" />
          <area shape="RECT" coords="421,0,481,66" href="/explore" />
        </map>
        <table width="700" border={0} cellpadding={0} cellspacing={0}>
          <tr>
            <td colspan={3}>
              <img src="/static/header.jpg" usemap="#mainmenu" border={0} />
            </td>
          </tr>

          <tr>
            <td colspan={3} bgcolor="#F5F8FA">
              <marquee>Welcome to twitter!</marquee>
            </td>
          </tr>

          <tr>
            <td colspan={3}>
              <font size={1} color="#ffffff">
                a
              </font>
            </td>
          </tr>

          <tr>
            <td width="120" fgcolor="#ffffff" valign="top">
              <SideMenu profile={model.profile} />
            </td>

            <td valign="top">{children.join("")}</td>
            <td valign="top" width="120">
              <Trends trends={model.trends} />
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};
