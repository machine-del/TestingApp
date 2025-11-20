import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
