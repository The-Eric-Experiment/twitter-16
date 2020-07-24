import { Tweet } from "./types";

function tweetContent(tweet: Tweet): string {
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
  if (text.startsWith("Is this what")) {
    console.log(text);
  }

  if (tweet.entities.hashtags) {
    text = tweet.entities.hashtags.reduce((acc, item, index) => {
      const a = `<a href="/twitter/search?q=#${item.text}">#${item.text}</a>`;
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

  if (text.startsWith("Is this what")) {
    console.log(text);
  }

  return /*template*/ `
    ${text.trim()}
    ${text.trim() ? `<br />` : ""}
    ${
      tweet.entities.media
        ? tweet.entities.media
            .map(
              (item) => /*template*/ `
      <a href="${item.media_url}">
        ${
          item.type === "photo"
            ? /*template*/ `<img src="/img/200/150?url=${item.media_url}" />`
            : ""
        }
      </a>
    `
            )
            .join("<br />")
        : ""
    }
  `;
}

export function tweet(tweet: Tweet): string {
  return /*template*/ `
    <tr>
      <td>
        <table width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td valign="top" width="30%" rowspan="3">
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <img
                      src="/img/40/40?url=${tweet.user.profile_image_url}"
                      width="40"
                      height="40"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <font size="2">
                      <b>${tweet.user.name}</b>
                    </font>
                    <br />
                    <font size="1">
                      @${tweet.user.screen_name}
                    </font>
                    <br />
                    <font size="1"> <b>Likes:</b> ${
                      tweet.favorite_count
                    } </font>
                    <br />
                    <font size="1"> <b>Retweets:</b> ${
                      tweet.retweet_count
                    } </font>
                  </td>
                </tr>
              </table>
            </td>
            <td valign="top">
              ${tweetContent(tweet)}              
            </td>
          </tr>
          <tr>
            <td valign="bottom"><font size="2"><b>${
              tweet.created_at
            }</b></font></td>
          </tr>
          <tr>
            <td>
              <form>
                <input type="submit">Retweet</input>
              </form>
              <form>
                <input type="submit">Like</input>
              </form>
            </td>
          </tr>
        </table>
        <hr />
      </td>
    </tr>
  `;
}
