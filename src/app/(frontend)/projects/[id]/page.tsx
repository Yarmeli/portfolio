import { ImageGallery } from "@/components/ImageGallery";
import { MotionWrapper } from "@/components/MotionWrapper";
import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { staggerChildren, staggerContainer } from "@/lib/animations";
import { Media, Project, Skill } from "@/payload-types";
import configPromise from "@payload-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    where: { _status: { equals: "published" } },
    limit: 100,
  });
  return projects.docs.map((project) => ({ id: project.id.toString() }));
}

async function getProject(id: string) {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: "projects",
    where: {
      id: {
        equals: id,
      },
      _status: {
        equals: "published",
      },
    },
  });

  if (!projects.docs[0]) {
    return null;
  }

  return projects.docs[0] as Project;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return { title: `Hamza Asif • ${project?.title}`, description: project?.shortDescription };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const thumbnail = project.thumbnail as Media;
  const images = project.images as Media[];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground sm:mb-8"
        >
          ← Back to Projects
        </Link>
        {/* Project Header */}
        <MotionWrapper
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <MotionWrapper variants={staggerChildren}>
            <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl">{project.title}</h1>
          </MotionWrapper>
          <MotionWrapper variants={staggerChildren}>
            {/* Technologies */}
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
              {project.technologies?.map((technology) => {
                const skill = technology as Skill;
                return (
                  <Badge
                    key={`skill-project-${skill.id}`}
                    className="px-2 py-1 text-xs sm:px-3 sm:text-sm"
                  >
                    {skill.name}
                  </Badge>
                );
              })}
            </div>
          </MotionWrapper>

          <MotionWrapper variants={staggerChildren}>
            <p className="text-base sm:text-lg">{project.shortDescription}</p>
          </MotionWrapper>
        </MotionWrapper>

        {/* Image Gallery */}
        {thumbnail && thumbnail.url && (
          <ImageGallery thumbnail={thumbnail} images={images || []} title={project.title} />
        )}

        {/* Project Content */}
        <div className="mt-2">
          <RichText content={project.description} enableGutter={false} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          {project.projectUrl && (
            <Link
              href={project.projectUrl}
              target="_blank"
              className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground sm:w-auto sm:px-6"
            >
              Open Live Version
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="w-full rounded-md border px-4 py-2 text-center text-sm font-semibold sm:w-auto sm:px-6"
            >
              View Code
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
