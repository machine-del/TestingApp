import { Outlet } from "react-router-dom";

export function AdminPage() {
  return (
    <>
      <h1>Admin page</h1>
      <Outlet />
    </>
  );
}
