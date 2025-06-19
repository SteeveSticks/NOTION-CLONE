"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  await auth.protect();

  const { sessionClaims } = await auth();

  if (!sessionClaims?.email) {
    throw new Error("User email not found in session claims");
  }

  const docCollectionRef = adminDb.collection("documents");

  // get the id back
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  await auth.protect(); // Ensure the user is authenticated

  console.log("deleteDocument", roomId);

  try {
    // Delete the document refrence
    await adminDb.collection("documents").doc(roomId).delete();

    // Get the exact roomdId from the rooms to match our current roomId
    const query = adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    // Use batch to delete the room refrence
    const batch = adminDb.batch();

    // Delete the room refrence in the user's collection for every user in the room
    (await query).docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Delete the liveblocks room
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
