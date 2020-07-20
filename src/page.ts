import { RenderOpts } from "./types";

export default function <TModel>(
  route: string,
  opts: Omit<RenderOpts<TModel>, "route">
): RenderOpts<TModel> {
  return {
    route,
    ...opts,
  };
}
