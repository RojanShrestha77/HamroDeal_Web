import { Facebook, Github, Youtube } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface SocialMediaProps {
  iconClassName?: string;
}

const socialLinks = [
  {
    title: "YouTube",
    href: "https://www.youtube.com/@rojanshrestha1319",
    icon: (className: string) => <Youtube className={className} />,
  },
  {
    title: "GitHub",
    href: "https://github.com/",
    icon: (className: string) => <Github className={className} />,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: (className: string) => <Facebook className={className} />,
  },
];

const SocialMedia = ({ iconClassName = "w-5 h-5" }: SocialMediaProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-5">
        {socialLinks.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-300 hover:border-shop_light_green hover:text-shop_light_green transition-colors duration-200"
              >
                {item.icon(iconClassName)}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
