"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = ({ role }: { role?: string }) => {
  const links = [
    { label: "Dashboard", href: "/", adminOnly: false },
    { label: "Tickets", href: "/Tickets", adminOnly: false },
    { label: "Users", href: "/Users", adminOnly: true },
  ];
  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.adminOnly || role === "ADMIN")
        .map((link) => {
          return (
            <Link
              href={link.href}
              className={`navbar-link ${
                currentPath == link.href &&
                "cursor-default text-primary/70 hover:text-primary/60"
              }`}
              key={link.label}
            >
              {link.label}
            </Link>
          );
        })}
    </div>
  );
};

export default MainNavLinks;
