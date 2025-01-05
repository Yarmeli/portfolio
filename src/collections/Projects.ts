import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateProjectsPage } from "@/hooks/revalidateProjectsPage";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "featured"],
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
    afterChange: [revalidateProjectsPage],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Short Description",
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "projectUrl",
      type: "text",
      label: "Project URL",
    },
    {
      name: "githubUrl",
      type: "text",
      label: "GitHub URL",
    },
    {
      name: "technologies",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
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
