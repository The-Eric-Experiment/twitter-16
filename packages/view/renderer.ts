import { TagDefinition } from "./types";
import { NO_TAG } from "./constants";

function renderTag(
  tag: string,
  props?: Record<string, any>,
  children?: Array<string | undefined>
) {
  const renderedChildren =
    children && children.length ? children.filter((o) => !!o).join("") : "";

  if (tag === NO_TAG) {
    return renderedChildren;
  }

  let block = `<${tag}`;
  if (props && Object.keys(props).length) {
    block = Object.keys(props).reduce((acc, key) => {
      return (acc += ` ${key}="${props[key]}"`);
    }, block);
  }

  if (renderedChildren) {
    block += `>${renderedChildren}</${tag}>`;
  } else {
    block += " />";
  }

  return block;
}

export async function render(
  component: TagDefinition | string | undefined
): Promise<string | undefined> {
  if (!component) {
    return "";
  }

  if (typeof component === "string") {
    return component;
  }

  if (typeof component.tag === "function") {
    const result = component.tag({
      ...component.props,
      children: component.children,
    });

    if (result instanceof Promise) {
      return render(await result);
    } else {
      return render(result);
    }
  }

  let children: string[] | undefined;

  if (component.children) {
    children = await Promise.all(
      component.children.map((child) => render(child))
    );
  }

  return renderTag(component.tag as string, component.props, children);
}
