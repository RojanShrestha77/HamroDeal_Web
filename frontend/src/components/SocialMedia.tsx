import { Facebook, Github, Youtube } from "lucide-react";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { TooltipContent } from "@radix-ui/react-tooltip";

const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@rojanshrestha1319",
    icon: <Youtube className="w-h h-5" />,
  },

  {
    title: "Github",
    href: "https://github.com/",
    icon: <Github className="w-h h-5" />,
  },

  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: <Facebook className="w-h h-5" />,
  },
];

const SocialMedia = () => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-5">
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger>
              <Link
                key={item?.title}
                href={item?.href}
                className="p-3 rounded-full border border-white hover:border-shop_light_green flex items-center justify-center hover:text-shop_light_green hoverEffect "
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
