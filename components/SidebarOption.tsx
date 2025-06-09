import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const SidebarOption = ({ href, id }: { href: string; id: string }) => {
  // Get data from firebase database
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = pathname.includes(href) && pathname !== "/";

  if (error)
    return (
      <div className="p-2 text-red-500 text-sm">Error loading document</div>
    );
  if (!data) return null;

  return (
    <Link
      href={href}
      className={`border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <p className="truncate">{data?.title}</p>
    </Link>
  );
};

export default SidebarOption;
