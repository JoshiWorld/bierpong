"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./ui/theme-switch";

type HeaderType = {
  title: string;
  route: string;
};

const items: HeaderType[] = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Services",
    route: "/services",
  },
  {
    title: "Pricing",
    route: "/pricing",
  },
  {
    title: "Contact",
    route: "/contact",
  },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <Navbar
      fluid
      className="shadow-lg dark:bg-background dark:shadow-md dark:shadow-white/[0.4]"
    >
      <NavbarBrand href="https://bierpong.brokoly.de"></NavbarBrand>
      <div className="flex md:order-2">
        <ThemeSwitch />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {items.map((item, index) => {
          return (
            <NavbarLink
              key={index}
              href={item.route}
              active={pathname === item.route}
            >
              {item.title}
            </NavbarLink>
          );
        })}
      </NavbarCollapse>
    </Navbar>
  );
}
