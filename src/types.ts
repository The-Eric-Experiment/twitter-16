import { Request, Response } from "express";

export interface Component<P = {}> {
  (props: PropsWithChildren<P>): Promise<string | null> | string | null;
}

export interface Route
  extends Component<{
    req: Request;
    res: Response;
    requestType: "POST" | "GET";
  }> {
  route: string;
}

export type PropsWithChildren<TProps> = TProps & {
  children?: string[];
};
