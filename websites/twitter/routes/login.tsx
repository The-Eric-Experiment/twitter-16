import { AuthBase } from "../types";
import { getOAuthAccessToken, getOAuthRequestToken } from "../api";
import { Route, tag } from "@retro-web/view";
import { createRequestModel } from "@retro-web/server";

type Model = AuthBase & {
  success?: boolean;
  loginUrl: string;
  oauthToken: string;
  oauthTokenSecret: string;
  results: {};
};

export const Login: Route = async ({ req, res, requestType }) => {
  const model = await createRequestModel<Model>(
    requestType,
    async () => {
      const {
        oauthToken,
        oauthTokenSecret,
        results,
      } = await getOAuthRequestToken();
      const loginUrl = `https://twitter.com/oauth/authorize?oauth_token=${oauthToken}`;
      return {
        oauthToken,
        oauthTokenSecret,
        loginUrl,
        results,
      };
    },
    async () => {
      const result = await getOAuthAccessToken(
        {
          oauthToken: req.body.oauthToken,
          oauthTokenSecret: req.body.oauthTokenSecret,
          results: {},
        },
        req.body.pin
      );

      console.log("failure");
      console.log(result);
      console.log("got here");
      res.cookie("twitter_access_token", result.oauthAccessToken, {
        maxAge: 72 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("twitter_access_token_secret", result.oauthAccessTokenSecret, {
        maxAge: 72 * 60 * 60 * 1000,
        httpOnly: true,
      });
      if (result) {
        console.log("there is result");
        res.redirect("/");
        console.log("redirected");
        return undefined;
      }
      return {
        oauthToken: req.body.oauthToken,
        oauthTokenSecret: req.body.oauthTokenSecret,
        results: {},
        loginUrl: "",
        success: true,
      };
    }
  );

  if (!model) {
    return undefined;
  }

  return (
    <html>
      <head>
        <title>Twitter Login</title>
      </head>
      <body>
        <h1>Welcome to twitter</h1>
        <p>
          Go to:{" "}
          <a href={model.loginUrl} target="_blank">
            {model.loginUrl}
          </a>
        </p>
        <p>Or scan the qrcode:</p>
        <img src={`/qrcode/150/150?url=${model.loginUrl}`} />

        <form action="/login" method="POST">
          <input
            type="hidden"
            id="oauthToken"
            name="oauthToken"
            value={model.oauthToken}
          />
          <input
            type="hidden"
            id="oauthTokenSecret"
            name="oauthTokenSecret"
            value={model.oauthTokenSecret}
          />
          <label for="pin">Pin:</label>
          <br />
          <input type="text" id="pin" name="pin" />
          <input type="submit" value="Alrighty!" />
        </form>
      </body>
    </html>
  );
};

Login.route = "/login";
