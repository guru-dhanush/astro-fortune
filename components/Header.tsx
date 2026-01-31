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
import { SERVICES } from "@/app/services/services.data";

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

      {/* ================= Desktop Navigation ================= */}
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

            {/* SERVICES – Desktop Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-130 gap-3 p-3 md:grid-cols-2">
                  {SERVICES.slice(0, 4).map((service) => (
                    <ServiceItem
                      key={service.title}
                      title={service.title}
                      image={service.image}
                      href="/services"
                      description={service.description[0]}
                    />
                  ))}

                  {/* View All Services Card */}
                  <li className="col-span-2">
                    <Link
                      href="/services"
                      className="flex items-center justify-center rounded-md border border-dashed p-4 text-sm font-medium hover:bg-muted"
                    >
                      View All Services →
                    </Link>
                  </li>
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
        <Button size="lg" className="w-full">
          Book an appointment
        </Button>
      </a>

      {/* ================= Mobile Menu ================= */}
      {/* ================= Mobile Menu ================= */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={Menu01Icon} size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="fixed inset-y-0 right-0 z-50 w-[300px] p-0"
          >
            {/* Header / Logo */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/astrologo.png"
                  alt="Astro Logo"
                  width={140}
                  height={32}
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 px-5 py-6">
              <Link
                href="/"
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted"
              >
                About
              </Link>

              {/* Mobile Services → Redirect only */}
              <Link
                href="/services"
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted"
              >
                Services
              </Link>

              <Link
                href="/blog"
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted"
              >
                Contact
              </Link>
            </nav>

            {/* CTA – fixed at bottom */}
            <div className="mt-auto border-t px-5 py-4">
              <a
                href="https://calendly.com/zintronia/30min?month=2026-01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" size="lg">
                  Book an appointment
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

/* ================= Service Card ================= */
function ServiceItem({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex gap-3 rounded-md p-3 hover:bg-muted">
          <Image src={image} alt={title} width={100} height={100} />
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
