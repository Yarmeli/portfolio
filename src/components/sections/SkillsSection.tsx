import { Media, Skill } from "@/payload-types";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <section className="bg-secondary/50 py-24 sm:py-32" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold">Skills</h2>
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-6 text-xl font-semibold capitalize">{category}</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => {
                    const icon = skill.icon as Media;
                    return (
                      <div key={skill.id} className="flex items-center gap-3 rounded-lg border p-4">
                        {icon && icon.url && (
                          <img src={icon.url} alt={skill.name} className="h-8 w-8 object-contain" />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
