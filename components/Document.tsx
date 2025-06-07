"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "document", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={updateTitle}>
          {/* update title.... */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* IF */}
          {/* isOnwer && InviteUser, DeleteDocument */}
        </form>
      </div>

      <div>
        {/* Manage User */}

        {/* Avatars */}
      </div>

      {/* Collaborative Editor */}
    </div>
  );
};

export default Document;
