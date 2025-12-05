"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  const path = usePathname();

  const navItems = [
    { label: "For Sale", href: "/" },
    { label: "For Rent", href: "/rent" },
    { label: "Agent Finder", href: "/agents" },
  ];

  const isActive = (href) => {
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="p-6 px-10 flex justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <img src="/logo380.svg" alt="logo" width={150} height={150} />
          </Link>

          <ul className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-medium text-sm transition-colors ${
                    isActive(item.href)
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary"
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

          {/* Post Ad Button */}
          <Link href="/add-new-listing">
            <Button className="flex gap-2">
              <Plus className="h-5 w-5" /> Post Your Ad
            </Button>
          </Link>

          {/* Login → redirect to full page */}
          <SignedOut>
            <SignInButton redirectUrl="/sign-in">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

      </div>
    </header>
  );
}

export default Header;
