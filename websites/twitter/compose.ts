import { frame } from "./shared/frame-template";
import { createTweet } from "./shared/api";

export type Model = {};

export default frame<Model>("/compose", {
  render() {
    return /*template*/ `
      <h3>Compose a Tweet</h3>
      <form action="/twitter/compose" method="POST">
        <textarea width="100%" id="tweet" name="tweet" maxlength="280" cols="74" rows="5"></textarea>
        <br />
        <table width="100%" bgcolor="#F5F8FA">
          <tr>
            <td>
              <input type="submit" value="Send!">
            </td>
          </tr>
        </table>
      </form>
    `;
  },
  async get(req, res) {
    return {};
  },
  async post(req, res) {
    const status = req.body.tweet;
    const accessToken = req.cookies.twitter_access_token;
    const accessTokenSecret = req.cookies.twitter_access_token_secret;
    if (!accessToken) {
      return { tweets: [] };
    }

    await createTweet({ status }, accessToken, accessTokenSecret);

    res.redirect("/twitter/home");
    return null;
  },
});
