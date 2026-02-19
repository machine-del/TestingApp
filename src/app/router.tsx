import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { NotFound } from "../pages/Errors/NotFoundPage";
import { StudentLayout } from "../layout/StudentLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { AdminPage } from "../pages/Admin/AdminPage";
import { LoginPage } from "../pages/Login/LoginPage";
import StudentsTestPage from "../pages/Student/StudentsTestPage";
import { StudentStatsPage } from "../pages/Student/StudentStatsPage";
import { StudentProfilePage } from "../pages/Student/StudentProfilePage";
import StudentsTest from "../pages/Student/StudentsRunTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"tests"} />,
          },
          {
            path: `tests`,
            element: <StudentsTestPage />,
          },
          {
            path: `test/:id`,
            element: <StudentsTest />,
          },
          {
            path: `statistics`,
            element: <StudentStatsPage />,
          },
          {
            path: `profile`,
            element: <StudentProfilePage />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPage /> },
          { path: "profile", element: <h2>Admin profile</h2> },
          { path: "settings", element: <h2>Admin settings</h2> },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
