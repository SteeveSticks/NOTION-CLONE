import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex space-x-2 items-center animate-pulse mb-4">
        <ArrowLeftCircle className="w-9 h-9" />
        <h1 className="font-bold text-sm">
          Get started with creating a New Document
        </h1>
      </div>

      <div>
        <img src="/image/notionclone.png" alt="Notion Clone" />
      </div>
    </main>
  );
}
