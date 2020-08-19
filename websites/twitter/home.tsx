import { getTweets } from "./shared/api";
import { Frame } from "./shared/frame";
import { Tweet } from "./shared/tweet";
import { Tweet as TweetData } from "./shared/types";
import { Request } from "express";
import { DateTime } from "luxon";
import { Route } from "../../src/types";
import { createRequestModel } from "../../src/model";
import { tag } from "../../src/tag";

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

const Home: Route = async ({ req, res, requestType }) => {
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
      console.log(req.body);
      return getData();
    }
  );

  return (
    <Frame cookies={req.cookies} session={req.session} res={res}>
      <table width="100%">
        {model.tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </table>
    </Frame>
  );
};

Home.route = "/home";

export default Home;
