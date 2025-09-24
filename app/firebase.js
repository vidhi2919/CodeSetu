// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth"; 
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD90bRm5I-qHrqcsELVXeJEf6oewRLXHRE",
//   authDomain: "namah-af06d.firebaseapp.com",
//   projectId: "namah-af06d",
//   storageBucket: "namah-af06d.appspot.com",
//   messagingSenderId: "337004717074",
//   appId: "1:337004717074:web:01b6429ddffe19af2424cb",
//   measurementId: "G-C2R0EYQP7N"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// // ✅ Export auth
// export { auth };

// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

let app

if (!getApps().length) {
  app = initializeApp({
    apiKey: "AIzaSyD90bRm5I-qHrqcsELVXeJEf6oewRLXHRE",
    authDomain: "namah-af06d.firebaseapp.com",
    projectId: "namah-af06d",
    storageBucket: "namah-af06d.appspot.com",
    messagingSenderId: "337004717074",
    appId: "1:337004717074:web:01b6429ddffe19af2424cb",
    measurementId: "G-C2R0EYQP7N"
  })
} else {
  app = getApp()
}

// ✅ Only initialize analytics in the browser
let analytics
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app)
  })
}

const auth = getAuth(app)

export { auth }
