import { Component, tag, TagDefinition } from "@retro-web/view";

export type PageLayoutProps = {
  title?: string;
  mainMenuMap?: Array<{ coords: string; href: string }>;
  heading?: (TagDefinition | undefined)[];
  leftContent?: TagDefinition | undefined;
  rightContent?: TagDefinition | undefined;
  footer?: (TagDefinition | undefined)[];
};

export const PageLayout: Component<PageLayoutProps> = ({
  title,
  heading,
  footer,
  leftContent,
  rightContent,
  mainMenuMap,
  children,
}) => {
  const layoutColumns = [leftContent, children, rightContent].filter((i) => !!i)
    .length;

  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body
        bgcolor="#ffffff"
        text="#000000"
        topmargin={0}
        leftmargin={0}
        rightmargin={0}
      >
        {mainMenuMap && (
          <map name="mainmenu">
            {mainMenuMap.map((map) => (
              <area shape="RECT" coords={map.coords} href={map.href} />
            ))}
          </map>
        )}
        <table width="700" border={0} cellpadding={0} cellspacing={0}>
          {heading &&
            heading.map((header) => (
              <tr>
                <td colspan={layoutColumns}>{header}</td>
              </tr>
            ))}

          <tr>
            {leftContent && (
              <td width="120" fgcolor="#ffffff" valign="top">
                {leftContent}
              </td>
            )}

            <td valign="top">{children}</td>

            {rightContent && (
              <td valign="top" width="120">
                {rightContent}
              </td>
            )}
          </tr>

          {footer &&
            footer.map((header) => (
              <tr>
                <td colspan={layoutColumns}>{header}</td>
              </tr>
            ))}
        </table>
      </body>
    </html>
  );
};
