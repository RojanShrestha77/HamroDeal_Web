import Link from "next/dist/client/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2>HamroDeal</h2>
    </Link>
  );
};

export default Logo;
