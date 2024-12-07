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
  });
  return projects.docs as Project[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-3xl font-bold">All Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => {
          const thumbnail = project.thumbnail as Media;
          return (
            <Link
              href={`/projects/${project.id}`}
              key={`project-${project.id}`}
              className="group flex items-center gap-6 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              {thumbnail && thumbnail.url && (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={thumbnail.url}
                    alt={project.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex gap-2">
                  {project.technologies?.map((technology) => {
                    const skill = technology as Skill;
                    return <Badge key={`skill-projects-${skill.id}`}>{skill.name}</Badge>;
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
