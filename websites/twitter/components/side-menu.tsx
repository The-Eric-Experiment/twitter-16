import { Component, ComponentBody, tag } from "@retro-web/view";
import { Profile } from "../types";

export const SideMenu: Component<{ profile: Profile }> = ({ profile }) => {
  return (
    <ComponentBody>
      <table width="120" cellspacing={0} cellpadding={0} border={0}>
        <tr>
          <td>
            <img src="/static/menu-top.jpg" />
          </td>
        </tr>
        <tr>
          <td bgcolor="#1DA1F2">
            <table cellspacing={4} cellpadding={0} border={0}>
              <tr>
                <td>
                  <img
                    src={`/img/60/60?url=${profile.profile_image_url}`}
                    width="60"
                    height="60"
                    border={0}
                  />
                </td>
              </tr>
              <tr>
                <td bgcolor="#1DA1F2" fgcolor="#ffffff">
                  <font size={3} color="#ffffff">
                    <b>{profile.name}</b>
                  </font>
                  <br />
                  <font size={2} color="#ffffff">
                    @{profile.screen_name}
                  </font>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/compose">
              <img
                src="/static/menu-compose.jpg"
                border={0}
                width="120"
                height="29"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/home">
              <img
                src="/static/menu-home.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/messages">
              <img
                src="/static/menu-messages.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/messages">
              <img
                src="/static/menu-explore.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <img src="/static/menu-bottom.jpg" border={0} />
          </td>
        </tr>
      </table>
      <br />
      <img src="/static/netscap4.gif" />
      <img src="/static/ie.gif" width="88" />
    </ComponentBody>
  );
};
