"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  const path = usePathname();

  const navItems = [
    { label: "For Sale", href: "/" },
    { label: "For Rent", href: "/rent" },
    { label: "Agent Finder", href: "/agents" },
  ];

  return (
    <div className="p-6 px-10 flex justify-between items-center shadow-sm fixed top-0 w-full z-50 bg-white">
      {/* Left Section */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <img src="/logo380.svg" alt="logo" width={150} height={150} />
        </Link>

        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <li
                className={`font-medium text-sm cursor-pointer hover:text-primary ${
                  path === item.href ? "text-primary" : ""
                }`}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex gap-3 items-center">
        <Link href="/add-new-listing">
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" />
            Post Your Ad
          </Button>
        </Link>

        {/* Not Signed In → Redirect to /sign-in */}
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="outline">Login</Button>
          </Link>
        </SignedOut>

        {/* Signed In → Show User Button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
