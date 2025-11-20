import { Outlet } from "react-router-dom";

export function StudentPage() {
  return (
    <>
      <h1>Student page</h1>
      <Outlet />
    </>
  );
}
