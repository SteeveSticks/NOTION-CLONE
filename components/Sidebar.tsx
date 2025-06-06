"use client";

import React, { useEffect } from "react";
import NewDocumentButton from "./NewDocumentButton";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

const Sidebar = () => {
  const { user } = useUser();

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {}, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* TODO  My Documents*/}
      {/* TODO  List...*/}

      {/* TODO Shared with me */}
      {/* TODO list */}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>

              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden sm:inline">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
