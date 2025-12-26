import { headerData } from "@/app/constant/data";
import Link from "next/link";
import React from "react";

const HeaderMenu = () => {
  return (
    <div>
      {headerData?.map((item) => (
        <Link key={item?.title} href={item?.href}>
          {item?.title}
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
