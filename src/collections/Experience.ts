import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateHomePage } from "@/hooks/revalidateHomePage";
import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "company",
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
      name: "company",
      type: "text",
      required: true,
      label: "Company Name (e.g. 'Working at...')",
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
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
  ],
};
