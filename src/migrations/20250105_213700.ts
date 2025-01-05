import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "order" numeric DEFAULT 999;
  ALTER TABLE "_projects_v" ADD COLUMN "version_order" numeric DEFAULT 999;
  ALTER TABLE "skills" ADD COLUMN "order" numeric DEFAULT 999;
  ALTER TABLE "_skills_v" ADD COLUMN "version_order" numeric DEFAULT 999;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "projects" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_order";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "_skills_v" DROP COLUMN IF EXISTS "version_order";`)
}
