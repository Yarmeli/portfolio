import { anyone, authenticated } from "@/access";
import type { CollectionConfig } from "payload";

export const Contact: CollectionConfig = {
  slug: "contact",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: anyone, // Allow anyone to submit the form
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "unread",
      options: [
        { label: "Unread", value: "unread" },
        { label: "Read", value: "read" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
