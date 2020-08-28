import { createTweet } from "../api";
import { tag, Route } from "@retro-web/view";
import { createRequestModel } from "@retro-web/server";
import { Frame } from "../components/frame";

export type Model = {};

export const Compose: Route = async ({ req, res, requestType }) => {
  await createRequestModel<Model>(
    requestType,
    async () => {
      return {};
    },
    async () => {
      const status = req.body.tweet;
      const accessToken = req.cookies.cookies_access_token;
      const accessTokenSecret = req.cookies.cookies_access_token_secret;
      if (!accessToken) {
        return { tweets: [] };
      }

      await createTweet({ status }, accessToken, accessTokenSecret);

      res.redirect("/home");
      return null;
    }
  );

  return (
    <Frame cookies={req.cookies} session={req.session} res={res}>
      <h3>Compose a Tweet</h3>
      <form action="/compose" method="POST">
        <textarea
          width="100%"
          id="tweet"
          name="tweet"
          maxlength={280}
          cols={58}
          rows={5}
        ></textarea>
        <br />
        <table width="100%" bgcolor="#F5F8FA">
          <tr>
            <td>
              <input type="submit" value="Send!" />
            </td>
          </tr>
        </table>
      </form>
    </Frame>
  );
};

Compose.route = "/compose";
