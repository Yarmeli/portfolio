import { About } from "@/payload-types";
import { SiGithub, SiLinkedin, SiX } from "@icons-pack/react-simple-icons";
import { Globe } from "lucide-react";
import Link from "next/link";

interface SocialLinkProps {
  socialLink: NonNullable<About["socialLinks"]>[number];
}

function getIcon(platform: SocialLinkProps["socialLink"]["platform"]) {
  switch (platform) {
    case "github":
      return SiGithub;
    case "twitter":
      return SiX;
    case "linkedin":
      return SiLinkedin;
    case "other":
    default:
      // Default to globe icon
      return Globe;
  }
}

export function SocialLink({ socialLink }: SocialLinkProps) {
  const Icon = getIcon(socialLink.platform);

  return (
    <Link
      href={socialLink.url!}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary/70"
    >
      <Icon size={32} title={socialLink.url ?? ""} />
    </Link>
  );
}
