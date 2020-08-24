import { Request, Response } from "express";

export type ComponentReturnType = TagDefinition | undefined;

export interface Component<P = {}> {
  (props: PropsWithChildren<P>):
    | ComponentReturnType
    | Promise<ComponentReturnType>;
}

export interface Route
  extends Component<{
    req: Request;
    res: Response;
    requestType: "POST" | "GET";
  }> {
  route: string;
}

export type Child = TagDefinition | string | undefined;

export type PropsWithChildren<TProps> = TProps & {
  children?: Child[];
};

export type TagDefinition = {
  tag: Component | string;
  props?: Record<string, any>;
  children?: Child[];
};
