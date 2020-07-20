import { OAuth } from "oauth";
import {
  AuthBase,
  AuthResult,
  Tweet,
  Trends,
  UserSettings,
  Profile,
  CreateTweetRequest,
} from "./types";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} from "../../../src/config";

const consumer = new OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  "1.0A",
  "oob",
  "HMAC-SHA1"
);

export const getOAuthRequestToken = () => {
  return new Promise<AuthBase>((resolve, reject) => {
    consumer.getOAuthRequestToken(
      (error, oauthToken, oauthTokenSecret, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ oauthToken, oauthTokenSecret, results });
        }
      }
    );
  });
};

export const getOAuthAccessToken = (model: AuthBase, pin: string) => {
  return new Promise<AuthResult>((resolve, reject) => {
    consumer.getOAuthAccessToken(
      model.oauthToken,
      model.oauthTokenSecret,
      pin,
      (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            oauthAccessToken,
            oauthAccessTokenSecret,
            results,
          });
        }
      }
    );
  });
};

export const getTweets = (accessToken: string, secret: string) => {
  console.log("called");
  return new Promise<Tweet[]>((resolve, reject) => {
    consumer.get(
      "https://api.twitter.com/1.1/statuses/home_timeline.json?count=10&tweet_mode=extended&extended_tweet=full_text&extended=full_text",
      accessToken,
      secret,
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data as string));
        }
      }
    );
  });
};

export const getTrends = (
  location: number,
  accessToken: string,
  secret: string
) => {
  return new Promise<Trends[]>((resolve, reject) => {
    consumer.get(
      `https://api.twitter.com/1.1/trends/place.json?id=${location}`,
      accessToken,
      secret,
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data as string));
        }
      }
    );
  });
};

export const getUserSettings = (accessToken: string, secret: string) => {
  return new Promise<UserSettings>((resolve, reject) => {
    consumer.get(
      "https://api.twitter.com/1.1/account/settings.json",
      accessToken,
      secret,
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data as string));
        }
      }
    );
  });
};

export const getUserProfile = (
  userHandle: string,
  accessToken: string,
  secret: string
) => {
  return new Promise<Profile>((resolve, reject) => {
    consumer.get(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${userHandle}`,
      accessToken,
      secret,
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data as string));
        }
      }
    );
  });
};

export function createTweet(
  data: CreateTweetRequest,
  accessToken: string,
  secret: string
) {
  return new Promise<Tweet>((resolve, reject) => {
    consumer.post(
      `https://api.twitter.com/1.1/statuses/update.json`,
      accessToken,
      secret,
      data,
      "application/json",
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data as string));
        }
      }
    );
  });
}
