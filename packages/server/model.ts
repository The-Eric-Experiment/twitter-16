export function createRequestModel<TModel>(
  requestType: "GET" | "POST",
  get: () => Promise<TModel>,
  post?: () => Promise<TModel>
): Promise<TModel | undefined> {
  switch (requestType) {
    case "POST":
      return post && post();
    default:
      return get();
  }
}

export function createModel<TModel>(
  fn: () => Promise<TModel>
): Promise<TModel> {
  return fn();
}
