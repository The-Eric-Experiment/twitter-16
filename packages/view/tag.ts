import { Component, TagDefinition, Child } from "./types";

export function tag(
  tagName: string | Component,
  props?: Record<string, any>,
  ...children: (Child | Child[])[]
): TagDefinition | undefined {
  const mergedChildren = children && [].concat.apply([], children);
  return {
    tag: tagName,
    props,
    children: mergedChildren,
  };
}
