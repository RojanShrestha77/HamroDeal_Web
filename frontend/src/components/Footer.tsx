import React from "react";
import Container from "./Container";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
