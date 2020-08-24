import { tag, Route, PropsWithChildren } from "@retro-web/view";

function Title(props: PropsWithChildren<{ title: string }>) {
  return <h1>{props.title}</h1>;
}

export const Home: Route = ({}) => {
  return (
    <html>
      <head>
        <title>BBC</title>
      </head>
      <body>
        <Title title="Welcome to the bbc!!" />
      </body>
    </html>
  );
};

Home.route = "/";
