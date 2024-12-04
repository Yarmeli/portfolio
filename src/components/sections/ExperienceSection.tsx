import { Experience, Skill } from "@/payload-types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-24 sm:py-32" id="experience">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="rounded-lg border bg-background p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{experience.position}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(experience.startDate).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {experience.endDate
                    ? new Date(experience.endDate).toLocaleDateString("en-GB", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Present"}
                </p>
              </div>
              <p className="mt-1 text-lg text-muted-foreground">{experience.company}</p>
              <div className="prose prose-sm mt-4 max-w-none">
                {JSON.stringify(experience.description)}
              </div>
              {experience.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.technologies.map((tech: Skill) => (
                    <span key={tech.id} className="rounded-full bg-secondary px-3 py-1 text-sm">
                      {tech.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
