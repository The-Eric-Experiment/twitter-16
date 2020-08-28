import { Component } from "../types/components";
import { tag } from "../builder/tag";
import { NO_TAG } from "../constants/html";

export const ComponentBody: Component = (props) =>
  tag(NO_TAG, undefined, ...props.children);
