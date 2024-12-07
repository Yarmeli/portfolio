import { Project } from "@/payload-types";
import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook } from "payload";

export const revalidateProjectsPage: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === "published") {
    const path = `/projects/${doc.id}`;

    payload.logger.info(`Revalidating project at path: ${path}`);

    revalidatePath(path);

    if (doc.featured) {
      payload.logger.info(`Revalidating home page since featured project was updated`);
      revalidatePath("/");
    }
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = `/projects/${previousDoc.id}`;

    payload.logger.info(`Revalidating old project at path: ${oldPath}`);

    revalidatePath(oldPath);
  }

  return doc;
};
