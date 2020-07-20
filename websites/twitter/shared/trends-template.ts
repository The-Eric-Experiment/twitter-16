import { Trends } from "./types";

export function trends(trends: Trends) {
  return /*template*/ `
  <table width="100%" cellspacing="0">
  <tr>
    <td bgcolor="#F5F8FA">
      <font size="4">
        <b>Trending</b>
      </font>
    </td>
  </tr>
  ${trends.trends
    .map(
      (trend) => /*template*/ `
    <tr>
      <td>
        <font size="2">
          <a href="${trend.url}">
            ${trend.name}
          </a>
        </font>
      </td>
    </tr>
  `
    )
    .join("")}                        
</table>
  `;
}
