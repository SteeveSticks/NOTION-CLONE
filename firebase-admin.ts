import { config } from "dotenv";
import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load environmet variables from .env.local
if (process.env.NODE_ENV !== "production") {
  config();
}

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_KEY || "{}");

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
