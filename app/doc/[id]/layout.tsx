import { auth } from "@clerk/nextjs/server";
import React from "react";
const DocLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { id } = params;

  auth.protect();
  return <div>{children}</div>;
};

export default DocLayout;
