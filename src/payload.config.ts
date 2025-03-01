// storage-adapter-import-placeholder
import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { About } from "./collections/About";
import { Contact } from "./collections/Contact";
import { Experience } from "./collections/Experience";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Skills } from "./collections/Skills";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, Skills, Experience, About, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "http://localhost:3000",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
