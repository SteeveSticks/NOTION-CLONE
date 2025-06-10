"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-3">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`s`} Space
        </h1>
      )}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
