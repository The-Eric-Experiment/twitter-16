import { Component } from "./types";

export async function tag(
  tag: string | Component,
  props?: Record<string, any>,
  ...children: (
    | Array<Promise<string | undefined>>
    | Promise<string | undefined>
    | string
    | undefined
  )[]
): Promise<string> {
  const awaitedChildren: string[] = await Promise.all(
    [].concat.apply([], children)
  );
  if (typeof tag === "function") {
    return tag({ ...props, children: awaitedChildren.filter((o) => !!o) });
  }

  let block = `<${tag}`;

  if (props && Object.keys(props).length) {
    block = Object.keys(props).reduce((acc, key) => {
      return (acc += ` ${key}="${props[key]}"`);
    }, block);
  }

  if (children) {
    block += `>${awaitedChildren.join("")}</${tag}>`;
  } else {
    block += " />";
  }

  return block;
}
