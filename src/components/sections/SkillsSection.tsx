import { fadeIn, staggerContainer } from "@/lib/animations";
import { Media, Skill } from "@/payload-types";
import { MotionWrapper } from "../MotionWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="bg-secondary/50 py-24 sm:py-32" id="skills">
      <div className="mx-auto max-w-6xl px-4">
        <MotionWrapper
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-3xl font-bold">Tech Stack</h2>
        </MotionWrapper>

        <MotionWrapper
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
        >
          {skills.map((skill) => {
            const icon = skill.icon as Media;
            return (
              <MotionWrapper
                key={`skill-${skill.id}`}
                variants={fadeIn}
                className="flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors hover:bg-secondary/50"
              >
                <Avatar className="h-12 w-12 rounded-sm">
                  {icon && icon.url ? (
                    <AvatarImage src={icon.url} alt={skill.name} />
                  ) : (
                    <AvatarFallback>{skill.name}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm">{skill.name}</span>
              </MotionWrapper>
            );
          })}
        </MotionWrapper>
      </div>
    </section>
  );
}
