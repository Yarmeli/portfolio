import { Badge } from "@/components/ui/badge";
import { Media, Project, Skill } from "@/payload-types";
import configPromise from "@payload-config";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

export const metadata: Metadata = {
  title: "Hamza Asif • Projects",
};

async function getProjects() {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    sort: "-createdAt",
    where: { _status: { equals: "published" } },
    limit: 100,
  });
  return projects.docs as Project[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <h1 className="mb-8 text-2xl font-bold sm:mb-12 sm:text-3xl">All Projects</h1>
      <div className="grid gap-4 sm:gap-6">
        {projects.map((project) => {
          const thumbnail = project.thumbnail as Media;
          return (
            <Link
              href={`/projects/${project.id}`}
              key={`project-${project.id}`}
              className="group flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:gap-6"
            >
              {thumbnail && thumbnail.url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:h-24 sm:w-24 sm:flex-shrink-0">
                  <Image
                    src={thumbnail.url}
                    alt={project.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-lg font-semibold sm:text-xl">{project.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies?.map((technology) => {
                    const skill = technology as Skill;
                    return (
                      <Badge
                        key={`skill-projects-${skill.id}`}
                        className="px-2 py-1 text-xs sm:text-sm"
                      >
                        {skill.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
