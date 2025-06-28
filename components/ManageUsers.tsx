"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { removeUserFromDocument } from "@/actions/actions";

const ManageUsers = () => {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [userInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User removed from the room successfully!");
      } else {
        toast.error("Failed to remove user from the room!");
      }
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild className="cursor-pointer" variant="outline">
          <DialogTrigger>Users ({userInRoom?.docs.length || 0})</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
              Below is the list of users who have access to this document.
            </DialogDescription>
          </DialogHeader>

          <hr className="my-2" />

          <div className="flex flex-col space-y-2">
            {userInRoom?.docs.map((doc) => (
              // Specific key
              <div
                key={doc.data().userId}
                className="flex items-center justify-between"
              >
                <p className="font-light">
                  {doc.data().userId === user?.emailAddresses[0].toString()
                    ? `You (${doc.data().userId})`
                    : doc.data().userId}
                </p>

                <div className="flex items-center gap-2">
                  <Button variant="outline">{doc.data().role}</Button>

                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0].toString() && (
                      <Button
                        onClick={() => handleDelete(doc.data().userId)}
                        className="cursor-pointer"
                        variant="destructive"
                        disabled={isPending}
                        size="sm"
                      >
                        {isPending ? "Removing.." : "X"}
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
