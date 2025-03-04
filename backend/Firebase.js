import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTjZWJ23C_2QF21UDFK5Ru9kLC_Br6W64",
  authDomain: "buildapc-1347a.firebaseapp.com",
  projectId: "buildapc-1347a",
  storageBucket: "buildapc-1347a.firebasestorage.app",
  messagingSenderId: "228769266695",
  appId: "1:228769266695:web:ee213c649a2e41c7417ea2"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// const firebaseConfig = process.env.NODE_ENV === 'production' ? {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "", 
//   measurementId: ""
// } : {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "com",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const database = getFirestore(app);
// export const analytics = () => getAnalytics(app);

// export default app