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
import { useState, useEffect } from "react";

type HeaderType = {
  title: string;
  route: string;
};

const items: HeaderType[] = [
  {
    title: "Start",
    route: "/",
  },
  {
    title: "Beitreten",
    route: "/join",
  },
  {
    title: "Erstellen",
    route: "/create",
  },
  {
    title: "Login",
    route: "/login",
  },
];

const itemsLoggedIn: HeaderType[] = [
  {
    title: "Tabelle",
    route: "/tournament",
  },
  {
    title: "Gruppe",
    route: "/tournament/group",
  },
  {
    title: "Statistik",
    route: "/tournament/stats",
  },
  {
    title: "Logout",
    route: "/tournament/logout",
  },
];

export function HeaderNav() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setData(data.payload);
      }).catch(() => setData(null));
  }, []);

  if (!data) return <BaseNav />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <NavLoggedIn team={data} />
}

function BaseNav() {
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

type TeamPayload = {
  teamId: string;
  teamName: string;
  tournamentId: string;
  code: string;
};

function NavLoggedIn({team}: {team: TeamPayload}) {
  const pathname = usePathname();

  return (
    <Navbar
      fluid
      className="shadow-lg dark:bg-background dark:shadow-md dark:shadow-white/[0.4]"
    >
      <NavbarBrand href="https://bierpong.brokoly.de">{team.teamName}</NavbarBrand>
      <div className="flex md:order-2">
        <ThemeSwitch />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {itemsLoggedIn.map((item, index) => {
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