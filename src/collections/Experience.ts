import { anyone, authenticated } from "@/access";
import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "company",
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      admin: {
        description: "Leave empty if this is your current position",
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "technologies",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
    },
  ],
};
