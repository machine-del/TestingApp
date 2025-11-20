import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { NotFound } from "../pages/Errors/NotFound";
import { StudentLayout } from "../layout/StudentLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { AdminPage } from "../pages/Admin/AdminPage";
import { StudentPage } from "../pages/Student/StudentPage";
import { LoginPage } from "../pages/Login/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      {
        path: "student",
        element: <StudentPage />,
        children: [
          {
            index: true,
            element: <StudentPage />,
          },
          {
            path: "test",
            element: <StudentLayout />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          { index: true, element: <AdminPage /> },
          { path: "test", element: <AdminLayout /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
