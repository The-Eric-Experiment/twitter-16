import { Component } from "./types";
import { tag } from "./tag";
import { NO_TAG } from "./constants";

export const ComponentBody: Component = (props) =>
  tag(NO_TAG, undefined, ...props.children);
