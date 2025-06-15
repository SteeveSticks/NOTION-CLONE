import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await auth.protect(); //Ensure the user is authenticated

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  if (!sessionClaims?.email) {
    throw new Error("User email is requried for session creation");
  }

  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      name: sessionClaims?.fullname,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  console.log("You are authorized");

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You're not in this room" },
      { status: 403 }
    );
  }
};
