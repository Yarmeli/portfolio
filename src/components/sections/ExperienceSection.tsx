import { fadeIn, slideIn, staggerContainer } from "@/lib/animations";
import { Experience, Media } from "@/payload-types";
import { MotionWrapper } from "../MotionWrapper";
import RichText from "../RichText";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-24 sm:py-32" id="experience">
      <div className="mx-auto max-w-6xl px-4">
        <MotionWrapper
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-3xl font-bold">Experience</h2>
        </MotionWrapper>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-black/50 dark:bg-white/50" />
          <MotionWrapper
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((experience) => {
              const logo = experience.companyLogo as Media;
              return (
                <MotionWrapper
                  key={`experience-${experience.id}`}
                  variants={slideIn}
                  className="relative flex gap-8"
                >
                  <div className="relative z-10">
                    <Avatar className="h-16 w-16 rounded-sm border bg-background">
                      {logo && logo.url ? (
                        <AvatarImage src={logo.url} alt={experience.company} />
                      ) : (
                        <AvatarFallback className="rounded-sm">{experience.company}</AvatarFallback>
                      )}
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 text-sm text-muted-foreground">
                      {new Date(experience.startDate).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                      {" - "}
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString("en-GB", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </div>
                    <h3 className="font-semibold">{experience.position}</h3>
                    <p className="text-muted-foreground">{experience.company}</p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <RichText content={experience.description} enableGutter={false} />
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
