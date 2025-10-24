import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "твоя_apiKey",
  authDomain: "fohow-site.firebaseapp.com",
  projectId: "fohow-site",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
