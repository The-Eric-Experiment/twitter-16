import { Component, tag } from "@retro-web/view";
import { Trends as TrendsType } from "../types";

export const Trends: Component<{ trends: TrendsType }> = ({ trends }) => {
  return (
    <table width="100%" cellspacing={0} cellpadding={0} border={0}>
      <tr>
        <td bgcolor="#F5F8FA">
          <font size={4}>
            <b>Trending</b>
          </font>
        </td>
      </tr>
      {trends.trends.map((trend) => (
        <tr>
          <td>
            <font size={2}>
              <a href={trend.url}>{trend.name}</a>
            </font>
          </td>
        </tr>
      ))}
    </table>
  );
};
