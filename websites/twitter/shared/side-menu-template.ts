import { Profile } from "./types";

export function sideMenu(profile: Profile) {
  return /*template*/ `
    <table width="120" cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <img src="/twitter/static/menu-top.jpg" />
      </td>
    </tr>
    <tr>
      <td bgcolor="#1DA1F2">
        <table cellspacing="2" cellpadding="2">
          <tr>
            <td>
              <img
                src="/img/60/60?url=${profile.profile_image_url}"
                width="60"
                height="60"
              />
            </td>
          </tr>
          <tr>
            <td bgcolor="#1DA1F2" fgcolor="#ffffff">
              <font size="3" color="#ffffff">
                <b>${profile.name}</b>
              </font>
              <br />
              <font size="2" color="#ffffff">
                @${profile.screen_name}
              </font>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
          <a href="/twitter/compose">
            <img src="/twitter/static/menu-compose.jpg" />
          </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/twitter/home">
          <img src="/twitter/static/menu-home.jpg" />
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/twitter/messages">
          <img src="/twitter/static/menu-messages.jpg" />
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/twitter/messages">
          <img src="/twitter/static/menu-explore.jpg" />
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <img src="/twitter/static/menu-bottom.jpg" />
      </td>
    </tr>
  </table>
  <br />
  <img src="/twitter/static/netscap4.gif" />
  <img src="/twitter/static/ie.gif" width="88" />
  `;
}
