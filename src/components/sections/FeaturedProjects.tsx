import { fadeIn, staggerContainer } from "@/lib/animations";
import { Media, Project, Skill } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { MotionWrapper } from "../MotionWrapper";
import { Badge } from "../ui/badge";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <MotionWrapper
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
            View all projects
          </Link>
        </MotionWrapper>

        <MotionWrapper
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const thumbnail = project.thumbnail as Media;
            return (
              <MotionWrapper
                key={`project-featured-${project.id}`}
                variants={fadeIn}
                className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-card/80"
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="p-2">
                    {thumbnail && thumbnail.url && (
                      <Image
                        src={thumbnail.url}
                        alt={project.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      {project.shortDescription}
                    </p>
                    <div className="mt-4 flex gap-2">
                      {project.technologies?.map((technology) => {
                        const skill = technology as Skill;
                        return <Badge key={`skill-featured-${skill.id}`}>{skill.name}</Badge>;
                      })}
                    </div>
                    <div className="mt-4 flex gap-2">
                      {project.projectUrl && (
                        <Link
                          href={project.projectUrl}
                          target="_blank"
                          className="text-sm text-primary hover:underline"
                        >
                          Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </Link>
              </MotionWrapper>
            );
          })}
        </MotionWrapper>
      </div>
    </section>
  );
}
