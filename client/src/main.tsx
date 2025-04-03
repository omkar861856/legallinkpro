import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Inter, Merriweather } from "./lib/fonts";

// Apply fonts to the document
document.documentElement.classList.add(Inter.variable, Merriweather.variable);

createRoot(document.getElementById("root")!).render(<App />);
