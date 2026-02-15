import React, { FC } from "react";
import { X } from "lucide-react";
import { headerData } from "@/app/constant/data";
import Link from "next/link";
import { useOutsideClick } from "../../../../hooks";
import Logo from "../navigation/Logo";
import SocialMedia from "../common/SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/80 shdaow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_light_green flex flex-col gap-6"
      >
        <div className="flex items-center justify-bet">
          <div className="text-white">
            <Logo />
          </div>
          <button
            onClick={onClose}
            className="hover:text-shop_light_green hoverEffect"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col  gap-8">
          <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
            {headerData?.map((item) => (
              <Link
                href={item?.href}
                key={item?.title}
                className="hover:text-shop_light_green hoverEffect"
              >
                {item?.title}
              </Link>
            ))}
          </div>
          <div>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
