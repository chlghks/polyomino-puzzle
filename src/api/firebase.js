import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  DATABASE_URL,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "../configuration/envConfig";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);

getDatabase(app);
