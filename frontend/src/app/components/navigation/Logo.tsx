import Link from "next/dist/client/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="inline-flex items-center">
      <span className="text-xl font-black tracking-tight text-[#1D1D1F]">
        Hamro
        <span className="text-[#0071E3]">Deal</span>
        <span className="text-[#0071E3] text-2xl leading-none">.</span>
      </span>
    </Link>
  );
};

export default Logo;
