import { Request, Response } from "express";

export type RenderThis<TModel> = {
  render(model: TModel): string;
};

export type RenderOpts<TModel> = {
  route: string;
  render(model: TModel): string;
  get(this: RenderThis<TModel>, req: Request, res: Response): Promise<void>;
  post(this: RenderThis<TModel>, req: Request, res: Response): Promise<void>;
};
