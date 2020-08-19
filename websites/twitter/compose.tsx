import { createRequestModel } from "../../src/model";
import { Route } from "../../src/types";
import { createTweet } from "./shared/api";
import { Frame } from "./shared/frame";
import { tag } from "../../src/tag";

export type Model = {};

const Compose: Route = async ({ req, res, requestType }) => {
  await createRequestModel<Model>(
    requestType,
    async () => {
      return {};
    },
    async () => {
      const status = req.body.tweet;
      const accessToken = req.cookies.twitter_access_token;
      const accessTokenSecret = req.cookies.twitter_access_token_secret;
      if (!accessToken) {
        return { tweets: [] };
      }

      await createTweet({ status }, accessToken, accessTokenSecret);

      res.redirect("/twitter/home");
      return null;
    }
  );

  return (
    <Frame cookies={req.cookies} session={req.session} res={res}>
      <h3>Compose a Tweet</h3>
      <form action="/twitter/compose" method="POST">
        <textarea
          width="100%"
          id="tweet"
          name="tweet"
          maxlength={280}
          cols={74}
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

export default Compose;
