"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "Preview content behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Shows task completion progress.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Separates content visually.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "Layered tab panels.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "Displays contextual information.",
  },
];

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-8 border-b">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/astrologo.png"
          alt="Logo"
          width={180}
          height={40}
          className="w-[140px] md:w-[180px]"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Desktop CTA */}
      <a
        href="https://calendly.com/zintronia/30min?month=2026-01"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block"
      >
        <Button size="lg">Book an appointment</Button>
      </a>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <HugeiconsIcon
                icon={Menu01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px]">
            <nav className="mt-6 flex flex-col gap-4">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>

              <Link href="/about" className="text-lg font-medium">
                About
              </Link>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Services</span>
                {components.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="pl-2 text-sm"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <Link href="/blog" className="text-lg font-medium">
                Blog
              </Link>

              <Link href="/contact" className="text-lg font-medium">
                Contact
              </Link>

              <a
                href="https://calendly.com/zintronia/30min?month=2026-01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-4 w-full">Book an appointment</Button>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex flex-col gap-1 rounded-md p-2 hover:bg-muted"
        >
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">{children}</span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
