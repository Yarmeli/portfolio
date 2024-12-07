import { anyone, authenticated } from "@/access";
import { revalidateHomePage } from "@/hooks/revalidateHomePage";
import type { CollectionConfig } from "payload";

export const About: CollectionConfig = {
  slug: "about",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: authenticated,
    read: anyone,
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
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "richText",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "locationFlag",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "GitHub", value: "github" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Twitter", value: "twitter" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "url",
          type: "text",
        },
      ],
    },
  ],
};
