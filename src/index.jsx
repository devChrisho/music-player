import React from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./AppWrapper";
import { initializeFirebase } from "./firebase/firebaseConfig";

// initialize Firebase
initializeFirebase();

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AppWrapper />);
