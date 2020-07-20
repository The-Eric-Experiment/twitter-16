import { getTweets } from "./shared/api";
import { frame } from "./shared/frame-template";
import { tweet } from "./shared/tweet-template";
import { Tweet } from "./shared/types";
import { Request } from "express";
import { DateTime } from "luxon";

export type Model = {
  tweets: Tweet[];
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
  console.log(timeDiff);
  if (timeDiff > 3) {
    console.log("create cache");
    session.result = await call();
    session.lastCall = DateTime.local().toFormat("FF");
    req.session[id] = session;
    req.session.save(() => {});
  }

  return session.result;
}

export default frame<Model>("/home", {
  render(model: Model) {
    return /*template*/ `
      <table width="100%">
        ${model.tweets.map(tweet).join("")}
      </table>
    `;
  },
  async get(req, res) {
    const accessToken = req.cookies.twitter_access_token;
    const accessTokenSecret = req.cookies.twitter_access_token_secret;
    if (!accessToken) {
      return { tweets: [] };
    }

    const tweets = await cache("home-getTweets", req, 3, () =>
      getTweets(accessToken, accessTokenSecret)
    );
    return { tweets };
  },
  async post(req, res) {
    const accessToken = req.cookies.twitter_access_token;
    const accessTokenSecret = req.cookies.twitter_access_token_secret;
    if (!accessToken) {
      return { tweets: [] };
    }

    const tweets = await cache("home-getTweets", req, 3, () =>
      getTweets(accessToken, accessTokenSecret)
    );
    return { tweets };
  },
});
