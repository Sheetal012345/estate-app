"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navItems = [
  { label: "For Sale", href: "/" },
  { label: "For Rent", href: "/rent" },
  { label: "Agent Finder", href: "/agents" },
];

function Header() {
  const path = usePathname();

  return (
    <div className="p-3 px-6 flex justify-between items-center shadow-sm fixed top-0 w-full z-50 bg-white">
      {/* Left Section */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <img src="/logo380.svg" alt="logo" width={80} height={80} />
        </Link>

        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-medium text-sm cursor-pointer hover:text-blue-600 hover:scale-105 transition-all duration-200 ${
                  path === item.href ? "text-blue-600" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex gap-3 items-center">
        <Link href="/post">
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" /> Post Your Ad
          </Button>
        </Link>

        <SignedOut>
          <SignInButton>
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
