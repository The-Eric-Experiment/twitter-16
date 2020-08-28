import { Response } from "express";
import { getTrends, getUserProfile, getUserSettings } from "../api";
import { SideMenu } from "./side-menu";
import { Trends } from "./trends";
import { Profile, Trends as TrendsData, UserSettings } from "../types";
import { Component, tag } from "@retro-web/view";
import { createModel } from "@retro-web/server";
import { PageLayout } from "../../../packages/layout";

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

  const renderTopHeader = () => {
    return <img src="/static/header.jpg" usemap="#mainmenu" border={0} />;
  };
  const renderWelcome = () => {
    return <hr />;
  };

  return (
    <PageLayout
      title="Twitter"
      mainMenuMap={[
        { coords: "1,0,300,66", href: "/" },
        { coords: "360,0,420,66", href: "/" },
        { coords: "421,0,481,66", href: "/explore" },
      ]}
      leftContent={<SideMenu profile={model.profile} />}
      rightContent={<Trends trends={model.trends} />}
      heading={[renderTopHeader(), renderWelcome()]}
      children={children}
    />
  );
};
