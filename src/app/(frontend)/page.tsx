import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { About, Experience, Project, Skill } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";

async function getHomeData() {
  const payload = await getPayload({ config: configPromise });

  const [aboutData, experiencesData, skillsData, projectsData] = await Promise.all([
    payload.find({ collection: "about", limit: 1, draft: false }),
    payload.find({ collection: "experience", sort: "-startDate", draft: false }),
    payload.find({ collection: "skills", draft: false }),
    payload.find({
      collection: "projects",
      sort: "-createdAt",
      where: { featured: { equals: true } },
      draft: false,
    }),
  ]);

  return {
    about: aboutData.docs[0] as About,
    experiences: experiencesData.docs as Experience[],
    skills: skillsData.docs as Skill[],
    projects: projectsData.docs as Project[],
  };
}

export default async function Home() {
  const { about, experiences, skills, projects } = await getHomeData();

  return (
    <div>
      <AboutSection about={about} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <FeaturedProjects projects={projects} />
      <ContactSection />
    </div>
  );
}
