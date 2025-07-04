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
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);

    startTransition(async () => {
      try {
        const documentData = doc.get("document-store").toJSON();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentData,
              question: input,
            }),
          }
        );

        if (res.ok) {
          const { message } = await res.json();
          if (!message) {
            toast.error("Question asked failed!: No content received");
            return;
          }
          setInput("");
          setSummary(message);
          toast.success("Question asked successfully!");
        } else {
          const errorData = await res.json().catch(() => ({}));
          toast.error(
            `Question asked failed: ${errorData.message || res.statusText}`
          );
        }
      } catch (error) {
        console.error("Question error:", error);
        toast.error("Question asked failed : Network error");
      }
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild className="cursor-pointer" variant="outline">
          <DialogTrigger>
            <MessageCircleCode className="mr-0" />
            Chat to Document
          </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat to the Document!</DialogTitle>
            <DialogDescription>
              Ask a question and chat to the document with AI
            </DialogDescription>

            <hr className="mt-3" />

            {question && <p className="mt-5 text-gray-500">Q : {question}</p>}
          </DialogHeader>

          {summary && (
            <div
              className="flex flex-col items-start max-h-95 overflow-y-auto gap-2 p-5 bg-gray-100"
              role="region"
              aria-label="Translation result"
            >
              <div className="flex">
                <BotIcon className="w-10 flex-shrink-0" aria-hidden="true" />
                <p className="font-bold">
                  GPT {isPending ? "is thinking.." : "Says:"}
                </p>
              </div>

              {isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
            </div>
          )}

          <form className="flex gap-2 " onSubmit={handleAskQuestion}>
            <Input
              type="text"
              placeholder="i.e. what is this about?"
              className="w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              className="cursor-pointer"
              type="submit"
              disabled={!input || isPending}
            >
              {isPending ? "Asking.." : "Ask"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatToDocument;
