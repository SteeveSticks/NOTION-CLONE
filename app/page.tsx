"use client"
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex space-x-2 items-center animate-pulse">
        <ArrowLeftCircle className="w-9 h-9" />
        <h1 className="font-bold text-sm">
          Get started with creating a New Document
        </h1>
      </div>

      <div className="flex items-center justify-content">
        <p className="font-playwrite text-4xl leading-13 tracking-wide py-15 px-10">
          Design your document with the flexibility to add text,
          images, and more.
          <span className="font-bold text-yellow-700">
            Create a new document and start building your content with
            ease.
          </span>
        </p>
        <img
          className="w-full rounded-md max-w-2xl p-6"
          src="/image/notiondescri.png"
          alt="Notion Clone"
        />
      </div>
    </main>
  );
}
