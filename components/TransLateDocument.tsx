"use client";

import React, { useState, useTransition } from "react";
import * as Y from "yjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { BotIcon, LanguagesIcon } from "lucide-react";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

const TransLateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [question, setQuestion] = useState("");

  const handleTranslateDocument = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // get the document data and convert it to json
        const documentData = doc.get("document-store").toJSON();

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
          toast.error("Translation service is not configured");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentData,
              targetLang: language,
            }),
          }
        );

        if (res.ok) {
          const { translated_text } = await res.json();
          if (!translated_text) {
            toast.error("Translation failed: No content received");
            return;
          }
          setSummary(translated_text);
          toast.success("Translated Summary successfully!");
        } else {
          const errorData = await res.json().catch(() => ({}));
          toast.error(
            `Translation failed: ${errorData.message || res.statusText}`
          );
        }
      } catch (error) {
        console.error("Translation error:", error);
        toast.error("Translation failed: Network error");
      }
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild className="cursor-pointer" variant="outline">
          <DialogTrigger>
            <LanguagesIcon />
            Translate
          </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Translate the document</DialogTitle>
            <DialogDescription>
              Select a language and AI will translate a summary of the document
              in the selected language
            </DialogDescription>

            <hr className="mt-5" />

            {question && <p className="mt-5 text-gray-500">{question}</p>}
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

          <form className="flex gap-2" onSubmit={handleTranslateDocument}>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>

              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={!language || isPending}
            >
              {isPending ? "Translating.." : "Translate"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransLateDocument;
