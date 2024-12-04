import { About, Media } from "@/payload-types";
import RichText from "../RichText";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AboutSectionProps {
  about: About;
}

export function AboutSection({ about }: AboutSectionProps) {
  const avatar = about?.avatar as Media;
  const locationFlag = about?.locationFlag as Media;

  return (
    <section className="py-24 sm:py-32" id="about">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
        {avatar && avatar.url && (
          <Avatar className="mb-6 h-32 w-32">
            <AvatarImage src={avatar.url} alt={avatar.alt} />
            <AvatarFallback>{avatar.alt}</AvatarFallback>
          </Avatar>
        )}
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{about.name}</h1>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <span className="text-lg text-muted-foreground">Based in {about.location}</span>
          {locationFlag && locationFlag.url && (
            <Avatar className="h-6 w-12 rounded-sm">
              <AvatarImage src={locationFlag.url} alt={locationFlag.alt} />
              <AvatarFallback>{locationFlag.alt}</AvatarFallback>
            </Avatar>
          )}
        </div>
        <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-7xl">{about.title}</h2>
        <div className="prose prose-lg max-w-[48rem] text-muted-foreground">
          <RichText content={about.bio} />
        </div>
      </div>
    </section>
  );
}
