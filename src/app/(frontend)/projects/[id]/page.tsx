import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { Media, Project, Skill } from "@/payload-types";
import configPromise from "@payload-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

async function getProject(id: string) {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!projects.docs[0]) {
    return null;
  }

  return projects.docs[0] as Project;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  const thumbnail = project.thumbnail as Media;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Projects
      </Link>

      <article className="flex w-full flex-col">
        {thumbnail && thumbnail.url && (
          <div className="relative mb-8 h-[400px] overflow-hidden rounded-lg">
            <img src={thumbnail.url} alt={project.title} className="h-full w-full object-cover" />
          </div>
        )}

        <h1 className="mb-6 text-4xl font-bold">{project.title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">{project.shortDescription}</p>

        <div className="mt-2">
          <RichText content={project.description} enableGutter={false} />
        </div>

        <div className="mt-8 flex gap-4">
          {project.projectUrl && (
            <Link
              href={project.projectUrl}
              target="_blank"
              className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
            >
              View Project
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="rounded-md border px-6 py-2 text-sm font-semibold"
            >
              View Code
            </Link>
          )}
        </div>
        <h3 className="text-lg font-semibold">Technologies:</h3>
        <div className="mt-8 flex gap-4">
          {project.technologies?.map((technology) => {
            const skill = technology as Skill;
            return <Badge key={skill.id}>{skill.name}</Badge>;
          })}
        </div>
      </article>
    </div>
  );
}
