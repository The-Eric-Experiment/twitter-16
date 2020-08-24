import { server } from "@retro-web/server";
import { Home } from "./routes/home";

server("bbc", [Home]);
