import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React from "react";
const DocLayout = async (props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;

  const { children } = props;

  const { id } = params;

  auth.protect();
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default DocLayout;
