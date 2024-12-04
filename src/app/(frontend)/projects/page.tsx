import { Media, Project } from "@/payload-types";
import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";

async function getProjects() {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    sort: "-createdAt",
  });
  return projects.docs as Project[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-3xl font-bold">All Projects</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => {
          const thumbnail = project.thumbnail as Media;
          return (
            <div key={project.id} className="group rounded-lg border">
              {thumbnail && thumbnail.url && (
                <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                  <img
                    src={thumbnail.url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <div className="prose prose-sm mt-4">{JSON.stringify(project.description)}</div>
                <div className="mt-6 flex gap-4">
                  {project.projectUrl && (
                    <Link
                      href={project.projectUrl}
                      target="_blank"
                      className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      View Project
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="rounded-md border px-4 py-2 text-sm font-semibold"
                    >
                      View Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
