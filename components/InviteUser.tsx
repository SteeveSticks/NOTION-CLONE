"use client";

import React, { FormEvent, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    setErrorMessage("");

    startTransition(async () => {
      const { success, error } = await inviteUserToDocument(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        setErrorMessage("");
        toast.success("User added to the room successfully!");
      } else {
        setErrorMessage(error || "Failed to add user to the room.");
        toast.error(error || "Failed to invite user!");
      }
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild className="cursor-pointer" variant="outline">
          <DialogTrigger>Invite</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a User to collaborate</DialogTitle>
            <DialogDescription>
              Enter the email of the user you want to invite
            </DialogDescription>
          </DialogHeader>

          <form className="flex gap-2 " onSubmit={handleInvite}>
            <Input
              type="email"
              placeholder="Email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              className="cursor-pointer"
              type="submit"
              disabled={!email || isPending}
            >
              {isPending ? "Inviting.." : "Invite"}
            </Button>
          </form>

          {errorMessage && (
            <p className="text-sm text-red-500">Error: {errorMessage}</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteUser;
