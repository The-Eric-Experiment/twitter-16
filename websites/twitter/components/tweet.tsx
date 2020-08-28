import { Tweet as TweetData } from "../types";
import { Component, tag, ComponentBody } from "@retro-web/view";

export const ProfilePic: Component<{ tweet: TweetData }> = ({ tweet }) => {
  return (
    <table cellpadding={4}>
      <tr>
        <td>
          <img
            src={`/img/40/40?url=${tweet.user.profile_image_url}`}
            width="40"
            height="40"
          />
        </td>
      </tr>
    </table>
  );
};

export const Tweet: Component<{ tweet: TweetData }> = ({ tweet }) => {
  return (
    <ComponentBody>
      <table width="100%" cellpadding={0} cellspacing={2} border={0}>
        <tr>
          <td rowspan={3} valign="top" width="52">
            <ProfilePic tweet={tweet} />
          </td>
          <td valign="top" height="22">
            <font size={2}>
              <b>{tweet.user.name}</b>
            </font>{" "}
            <font size={1}>@{tweet.user.screen_name}</font>
          </td>
          <td rowspan={3} valign="top" width="65">
            <font size={1}>
              <b>Likes:</b> {tweet.retweet_count.toString()}{" "}
            </font>
            <form width="100%" method="POST" action="/home">
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
              <input width="100%" type="submit" value="Retweet" />
            </form>
            <font size={1}>
              <b>Likes:</b> {tweet.favorite_count.toString()}{" "}
            </font>
            <form width="100%" method="POST" action="/home">
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
              <input width="100%" type="submit" value="Like" />
            </form>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <TweetBody tweet={tweet} />
          </td>
        </tr>
        <tr>
          <td valign="bottom" height="22">
            <font size={2}>
              <b>{tweet.created_at}</b>
            </font>
          </td>
        </tr>
      </table>
      <hr />
    </ComponentBody>
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
        tweet.entities.media.map((item) => (
          <a href={item.media_url}>
            {item.type === "photo" ? (
              <img
                src={`/img/200/150?url=${item.media_url}`}
                alt="tweet-image"
              />
            ) : (
              ""
            )}
          </a>
        ))}
    </ComponentBody>
  );
}
