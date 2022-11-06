import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { initializeFirebase } from "./firebase/firebaseConfig";

// initialize Firebase
initializeFirebase();

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
