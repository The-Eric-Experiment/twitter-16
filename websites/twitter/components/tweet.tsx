import { Tweet as TweetData } from "../types";
import { Component, tag, ComponentBody } from "@retro-web/view";

export const Tweet: Component<{ tweet: TweetData }> = ({ tweet }) => {
  return (
    <tr>
      <td>
        <table width="100%" cellspacing={0} cellpadding={0} border={0}>
          <tr>
            <td valign="top" width="30%" rowspan={3}>
              <table cellspacing={0} cellpadding={0} border={0}>
                <tr>
                  <td>
                    <img
                      src={`/img/40/40?url=${tweet.user.profile_image_url}`}
                      width="40"
                      height="40"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <font size={2}>
                      <b>{tweet.user.name}</b>
                    </font>
                    <br />
                    <font size={1}>@{tweet.user.screen_name}</font>
                    <br />
                    <font size={1}>
                      {" "}
                      <b>Likes:</b> {tweet.favorite_count}{" "}
                    </font>
                    <br />
                    <font size={1}>
                      {" "}
                      <b>Retweets:</b> {tweet.retweet_count}{" "}
                    </font>
                  </td>
                </tr>
              </table>
            </td>
            <td valign="top">
              <TweetBody tweet={tweet} />
            </td>
          </tr>
          <tr>
            <td valign="bottom">
              <font size={2}>
                <b>{tweet.created_at}</b>
              </font>
            </td>
          </tr>
          <tr>
            <td>
              <form method="POST" action="/home">
                <input
                  type="hidden"
                  id="tweet_id"
                  name="tweet_id"
                  value={tweet.id_str}
                />
                <input
                  type="hidden"
                  id="tweet_action"
                  name="tweet_action"
                  value="rt"
                />
                <input type="submit" value="Retweet" />
              </form>
              <form method="POST" action="/home">
                <input
                  type="hidden"
                  id="tweet_id"
                  name="tweet_id"
                  value={tweet.id_str}
                />
                <input
                  type="hidden"
                  id="tweet_action"
                  name="tweet_action"
                  value="like"
                />
                <input type="submit" value="Like" />
              </form>
            </td>
          </tr>
        </table>
        <hr />
      </td>
    </tr>
  );
};

function TweetBody({ tweet }: { tweet: TweetData }): string {
  let text = tweet.full_text || tweet.text;

  if (tweet.entities.media) {
    text = tweet.entities.media.reduce((acc, item, index) => {
      const difference = item.indices[1] - item.indices[0];
      for (let i = index + 1; i < tweet.entities.media.length; i++) {
        tweet.entities.media[i].indices[0] =
          tweet.entities.media[i].indices[0] - difference;
        tweet.entities.media[i].indices[1] =
          tweet.entities.media[i].indices[1] - difference;
      }

      (Object.keys(tweet.entities) as Array<keyof typeof tweet.entities>)
        .filter((k) => k !== "media")
        .forEach((key) => {
          tweet.entities[key].forEach((ent: any) => {
            if (ent.indices[0] > item.indices[1]) {
              ent.indices[0] = ent.indices[0] + difference;
              ent.indices[1] = ent.indices[1] + difference;
            }
          });
        });

      return acc.slice(0, item.indices[0]) + acc.slice(item.indices[1]);
    }, text);
  }

  if (tweet.entities.hashtags) {
    text = tweet.entities.hashtags.reduce((acc, item, index) => {
      const a = `<a href="/search?q=#${item.text}">#${item.text}</a>`;
      const oldSize = item.indices[1] - item.indices[0];
      const difference = a.length - oldSize;

      (Object.keys(tweet.entities) as Array<
        keyof typeof tweet.entities
      >).forEach((key) => {
        tweet.entities[key].forEach((ent: any) => {
          if (ent.indices[0] > item.indices[1]) {
            ent.indices[0] = ent.indices[0] + difference;
            ent.indices[1] = ent.indices[1] + difference;
          }
        });
      });

      // Slice of hashtag has weird indices because of the # symbol and stuff.
      return `${acc.slice(0, item.indices[0] - 1)} ${a} ${acc.slice(
        item.indices[1] + 1
      )}`;
    }, text);
  }

  return (
    <ComponentBody>
      {text.trim()}
      {text.trim() ? <br /> : ""}
      {tweet.entities.media &&
        tweet.entities.media
          .map((item) => (
            <a href={item.media_url}>
              {item.type === "photo" ? (
                <img src={`/img/200/150?url=${item.media_url}`} />
              ) : (
                ""
              )}
            </a>
          ))
          .join("<br />")}
    </ComponentBody>
  );
}
