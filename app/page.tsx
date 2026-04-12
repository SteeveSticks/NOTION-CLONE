"use client";
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

      <div className="grid items-center justify-center">
        <p className="font-playwrite text-2xl md:text-4xl leading-10 md:leading-13 tracking-wide py-8 px-4 md:py-15 md:px-10">
          
          <span className="hidden md:block">Design your document with the flexibility to add text,
          images, and more.</span> 
          <span className="font-bold text-yellow-700">
            Create a new document and start building your content with
            ease.
          </span>
        </p>
        <div className="bg-black p-2 border md:p-6 rounded-md">
          <img
            className="w-full rounded-md shadow-md"
            src="/image/notiondescri.png"
            alt="Notion Clone"
          />
        </div>
      </div>
    </main>
  );
}
