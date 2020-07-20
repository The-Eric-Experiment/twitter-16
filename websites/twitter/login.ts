import render from "../../src/page";
import { AuthBase } from "./shared/types";
import { getOAuthAccessToken, getOAuthRequestToken } from "./shared/api";

type Model = AuthBase & {
  success?: boolean;
  loginUrl: string;
};

export default render("/login", {
  render(model: Model) {
    return /*template*/ `
    <html>
    <head>
      <title>Twitter Login</title>
    </head>
    <body>
      
      <h1>Welcome to twitter</h1>
      <p>
        Go to: <a href="${model.loginUrl}" target="_blank">
        ${model.loginUrl}
        </a>
      </p>
      <p>Or scan the qrcode:</p>
      <img src="/qrcode/150/150?url=${model.loginUrl}">
      <form action="/twitter/login" method="POST">
        <input type="hidden" id="oauthToken" name="oauthToken" value=${model.oauthToken}>
        <input type="hidden" id="oauthTokenSecret" name="oauthTokenSecret" value=${model.oauthTokenSecret}>
        <label for="pin">Pin:</label><br>
        <input type="text" id="pin" name="pin">
        <input type="submit" value="Alrighty!">
      </form>
      
    </body>
    </html>
    `;
  },
  async get(req, res) {
    const {
      oauthToken,
      oauthTokenSecret,
      results,
    } = await getOAuthRequestToken();

    const loginUrl = `https://twitter.com/oauth/authorize?oauth_token=${oauthToken}`;

    res.send(
      this.render({
        oauthToken,
        oauthTokenSecret,
        loginUrl,
        results,
      })
    );
  },
  async post(req, res) {
    const result = await getOAuthAccessToken(
      {
        oauthToken: req.body.oauthToken,
        oauthTokenSecret: req.body.oauthTokenSecret,
        results: {},
      },
      req.body.pin
    );

    res.cookie("twitter_access_token", result.oauthAccessToken, {
      maxAge: 72 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("twitter_access_token_secret", result.oauthAccessTokenSecret, {
      maxAge: 72 * 60 * 60 * 1000,
      httpOnly: true,
    });

    if (result) {
      res.redirect("/twitter/home");
      return;
    }

    res.send(
      this.render({
        oauthToken: req.body.oauthToken,
        oauthTokenSecret: req.body.oauthTokenSecret,
        results: {},
        loginUrl: "",
        success: true,
      })
    );
  },
});
