import {
  initializeApp,
  getApps,
  App,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "./service_key.json" with { type: "json" };

const typedServiceKey: ServiceAccount = serviceKey as ServiceAccount;

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(typedServiceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
