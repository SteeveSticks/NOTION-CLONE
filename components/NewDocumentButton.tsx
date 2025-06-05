"use client";

import React from "react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { useRouter } from "next/router";

const NewDocumentButton = () => {
  const [isPeding, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={!isPeding}>
        {isPeding ? "Creating" : "New Document"}
      </Button>
    </div>
  );
};

export default NewDocumentButton;
