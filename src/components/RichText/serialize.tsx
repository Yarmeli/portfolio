import { cn } from "@/lib/utils";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import Link from "next/link";
import React, { Fragment, JSX } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";

export type NodeTypes = DefaultNodeTypes;

type Props = {
  nodes: NodeTypes[];
};

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null;
        }

        if (node.type === "text") {
          let text = <React.Fragment key={`text-${index}`}>{node.text}</React.Fragment>;
          if (node.format & IS_BOLD) {
            text = <strong key={`text-${index}`}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={`text-${index}`}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={`text-${index}`} className="line-through">
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={`text-${index}`} className="underline">
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={`text-${index}`}>{node.text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={`text-${index}`}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={`text-${index}`}>{text}</sup>;
          }

          return text;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === "list" && node?.listType === "check") {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] });
          }
        };

        const serializedChildren = "children" in node ? serializedChildrenFn(node) : "";

        switch (node.type) {
          case "linebreak": {
            return <br className="col-start-2" key={`text-${index}`} />;
          }
          case "paragraph": {
            return (
              <p
                className={cn("col-start-2", {
                  "text-left": node.format === "left",
                  "text-center": node.format === "center",
                  "text-right": node.format === "right",
                  "text-justify": node.format === "justify",
                })}
                key={`text-${index}`}
              >
                {serializedChildren}
              </p>
            );
          }
          case "heading": {
            const Tag = node?.tag;
            return (
              <Tag
                className={cn("col-start-2", {
                  "text-left": node.format === "left",
                  "text-center": node.format === "center",
                  "text-right": node.format === "right",
                  "text-justify": node.format === "justify",
                })}
                key={`text-${index}`}
              >
                {serializedChildren}
              </Tag>
            );
          }
          case "list": {
            const Tag = node?.tag;
            return (
              <Tag
                className={cn("list col-start-2", {
                  "text-left": node.format === "left",
                  "text-center": node.format === "center",
                  "text-right": node.format === "right",
                  "text-justify": node.format === "justify",
                })}
                key={`text-${index}`}
              >
                {serializedChildren}
              </Tag>
            );
          }
          case "listitem": {
            const hasSubLists = node.children.some((child) => child.type === "list");

            if (node.checked !== undefined) {
              const uuid = uuidv4();

              return (
                <li
                  aria-checked={node.checked ? "true" : "false"}
                  className={cn("list-none outline-none", node.checked ? "line-through" : "", {
                    "text-left": node.format === "left",
                    "text-center": node.format === "center",
                    "text-right": node.format === "right",
                    "text-justify": node.format === "justify",
                  })}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {hasSubLists ? (
                    serializedChildren
                  ) : (
                    <div className="flex items-center gap-2">
                      <input checked={node.checked} id={uuid} readOnly={true} type="checkbox" />
                      <label htmlFor={uuid}>{serializedChildren}</label>
                    </div>
                  )}
                </li>
              );
            } else {
              return (
                <li
                  className={cn(hasSubLists ? "list-none" : "list-inside", {
                    "text-left": node.format === "left",
                    "text-center": node.format === "center",
                    "text-right": node.format === "right",
                    "text-justify": node.format === "justify",
                  })}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            }
          }
          case "quote": {
            return (
              <blockquote
                className={cn("col-start-2", {
                  "text-left": node.format === "left",
                  "text-center": node.format === "center",
                  "text-right": node.format === "right",
                  "text-justify": node.format === "justify",
                })}
                key={`text-${index}`}
              >
                {serializedChildren}
              </blockquote>
            );
          }
          case "link": {
            const fields = node.fields;

            return (
              <Link
                key={`text-${index}`}
                target={fields?.newTab ? "_blank" : "_self"}
                href={fields.url}
                className={cn({
                  "text-left": node.format === "left",
                  "text-center": node.format === "center",
                  "text-right": node.format === "right",
                  "text-justify": node.format === "justify",
                })}
              >
                {serializedChildren}
              </Link>
            );
          }

          case "horizontalrule": {
            return <hr className="col-start-2" key={`text-${index}`} />;
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
