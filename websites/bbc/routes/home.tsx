import { tag, Route, PropsWithChildren, ComponentBody } from "@retro-web/view";

function Title(props: PropsWithChildren<{ title: string }>) {
  return (
    <ComponentBody>
      <p>
        <h1>{props.title}</h1>
        {"The place"}
        <p>For the news</p>
      </p>
    </ComponentBody>
  );
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
