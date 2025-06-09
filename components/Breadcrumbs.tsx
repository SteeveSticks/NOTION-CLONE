"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumbs = () => {
  const path = usePathname();

  return <div>Breadcrumbs</div>;
};

export default Breadcrumbs;
