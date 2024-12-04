import { About, Media } from "@/payload-types";

interface AboutSectionProps {
  about: About;
}

export function AboutSection({ about }: AboutSectionProps) {
  const avatar = about?.avatar as Media;

  return (
    <section className="container mx-auto px-4 py-24 sm:py-32" id="about">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m {about.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{about.title}</p>
          <div className="prose prose-lg mt-6 text-muted-foreground">
            <p>{JSON.stringify(about.bio)}</p>
          </div>
        </div>
        {avatar && avatar.url && (
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <img src={avatar.url} alt={about.name} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
