let twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
let twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;

if (process.env.ENV === "development") {
  const devConfig = require("../dev_config.json");
  twitterConsumerKey = devConfig.twitterConsumerKey;
  twitterConsumerSecret = devConfig.twitterConsumerSecret;
}

export const TWITTER_CONSUMER_KEY = twitterConsumerKey;
export const TWITTER_CONSUMER_SECRET = twitterConsumerSecret;
