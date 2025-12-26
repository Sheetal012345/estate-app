"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SignedIn, SignedOut, useUser,SignOutButton} from "@clerk/nextjs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
  const path = usePathname();
  const { user } = useUser(); 

  const navItems = [
    { label: "For Sale", href: "/" },
    { label: "For Rent", href: "/rent" },
    { label: "Agent Finder", href: "/agents" },
  ];

  return (
    <div className="h-42 px-6 flex justify-between items-center shadow-sm fixed top-0 w-full z-50 bg-white">

      {/* Left Section */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <img src="/st.jpeg" alt="logo" width={90} height={40} className="object-contain"/>
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
<div className="flex gap-5 items-center">
  <Link href="/add-new-listing">
    <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
          
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Image src={user?.imageUrl} width={35} height={35} alt='user profile'
          className='rounded-full'
          />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={'/user'}>Profile</Link>
      </DropdownMenuItem>
    <DropdownMenuItem>My Listing</DropdownMenuItem>
    <DropdownMenuItem><SignOutButton>Logout</SignOutButton></DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;