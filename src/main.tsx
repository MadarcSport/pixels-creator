import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.tsx";
import { EcommercePage } from "./components/EcommercePage.tsx";
import { ThreeJsPage } from "./components/ThreeJsPage.tsx";
import { StackRoadmapPage } from "./components/roadMap/StackRoadmapPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/threejs" element={<ThreeJsPage />} />
        <Route path="/my-stack" element={<StackRoadmapPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
);
