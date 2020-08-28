import { createRequestModel } from "@retro-web/server";
import { Route, tag } from "@retro-web/view";
import { Request } from "express";
import { DateTime } from "luxon";
import { getTweets } from "../api";
import { Frame } from "../components/frame";
import { Tweet } from "../components/tweet";
import { Tweet as TweetData } from "../types";

export type Model = {
  tweets: TweetData[];
};

async function cache<T>(
  id: string,
  req: Request,
  cacheMinutes: number,
  call: () => Promise<T>
): Promise<T> {
  const session = req.session[id] || {};
  const timeDiff = session.lastCall
    ? DateTime.local()
        .diff(DateTime.fromFormat(session.lastCall, "FF"))
        .as("minutes")
    : cacheMinutes + 1;
  if (timeDiff > 3) {
    session.result = await call();
    session.lastCall = DateTime.local().toFormat("FF");
    req.session[id] = session;
    req.session.save(() => {});
  }

  return session.result;
}

export const Home: Route = async ({ req, res, requestType }) => {
  const getData = async () => {
    const accessToken = req.cookies.twitter_access_token;
    const accessTokenSecret = req.cookies.twitter_access_token_secret;
    if (!accessToken) {
      return { tweets: [] };
    }

    const tweets = await cache("home-getTweets", req, 3, () =>
      getTweets(accessToken, accessTokenSecret)
    );
    return { tweets };
  };

  const model = await createRequestModel<Model>(
    requestType,
    getData,
    async () => {
      return getData();
    }
  );

  return (
    <Frame cookies={req.cookies} session={req.session} res={res}>
      {model.tweets.map((tweet) => (
        <Tweet tweet={tweet} />
      ))}
    </Frame>
  );
};

Home.route = "/";
