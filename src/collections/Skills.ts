import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateHomePage } from "@/hooks/revalidateHomePage";
import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "order"],
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: true },
  },
  hooks: {
    afterChange: [revalidateHomePage],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
        { label: "Programming", value: "programming" },
        { label: "DevOps", value: "devops" },
        { label: "Testing", value: "testing" },
        { label: "Languages", value: "languages" },
      ],
      required: true,
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Use this field to control the display order (lower numbers appear first)",
        position: "sidebar",
      },
      defaultValue: 999,
    },
  ],
};
