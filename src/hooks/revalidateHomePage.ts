import { About, Experience, Project, Skill } from "@/payload-types";
import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook } from "payload";

export const revalidateHomePage: CollectionAfterChangeHook<About | Experience | Skill> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === "published") {
    payload.logger.info("Revalidating home page");
    revalidatePath("/");
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === "published" && doc._status !== "published") {
    payload.logger.info("Revalidating old home page");
    revalidatePath("/");
  }

  return doc;
};
