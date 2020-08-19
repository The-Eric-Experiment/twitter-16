import { Profile } from "./types";
import { Component } from "../../../src/types";
import { ComponentBody } from "../../../src/component-body";
import { tag } from "../../../src/tag";

export const SideMenu: Component<{ profile: Profile }> = ({ profile }) => {
  return (
    <ComponentBody>
      <table width="120" cellspacing={0} cellpadding={0} border={0}>
        <tr>
          <td>
            <img src="/twitter/static/menu-top.jpg" />
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
            <a href="/twitter/compose">
              <img
                src="/twitter/static/menu-compose.jpg"
                border={0}
                width="120"
                height="29"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/twitter/home">
              <img
                src="/twitter/static/menu-home.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/twitter/messages">
              <img
                src="/twitter/static/menu-messages.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/twitter/messages">
              <img
                src="/twitter/static/menu-explore.jpg"
                border={0}
                width="120"
                height="19"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <img src="/twitter/static/menu-bottom.jpg" border={0} />
          </td>
        </tr>
      </table>
      <br />
      <img src="/twitter/static/netscap4.gif" />
      <img src="/twitter/static/ie.gif" width="88" />
    </ComponentBody>
  );
};
