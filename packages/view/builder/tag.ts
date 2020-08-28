import { Component, TagDefinition, Child } from "../types/components";

export function tag(
  tagName: string | Component,
  props?: Record<string, any>,
  ...children: (Child | Child[])[]
): TagDefinition | undefined {
  const consolidatedChildren = ((props && props.children) || children) as
    | Array<string | TagDefinition | Child[]>
    | undefined;
  const mergedChildren =
    consolidatedChildren && [].concat.apply([], consolidatedChildren);
  return {
    tag: tagName,
    props,
    children: mergedChildren,
  };
}
