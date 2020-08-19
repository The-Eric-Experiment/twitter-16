import { tag } from "../../src/tag";
import { Route, PropsWithChildren } from "../../src/types";

function Title(props: PropsWithChildren<{ title: string }>) {
  return <h1>{props.title}</h1>;
}

const Home: Route = ({}) => {
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

export default Home;
