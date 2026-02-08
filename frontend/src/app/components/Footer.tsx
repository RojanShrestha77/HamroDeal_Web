import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import FooterTop from "./FooterTop";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/app/constant/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Nepal's ultimate online marketplace for amazing deals on
              electronics, fashion, home goods, and more—with fast delivery
              nationwide!
            </SubText>
            <div className="text-darkColor/60">
              <SocialMedia iconClassName="border-darkColor/60 hover:border-shop hover:text-shop_dark_green" />
            </div>
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green hoverEffect text-sm"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="hover:text-shop_light_green hoverEffect text-sm"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}
            <span className="text-darkColor font-black tracking-wider uppercase hover:text-shop_dark_green hoverEffect group font-sans">
              HamroDea
              <span className="text-shop_dark_green group-hover:text-darkColor hoverEffect">
                l
              </span>
            </span>
            .All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
