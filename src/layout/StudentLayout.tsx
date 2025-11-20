import { Outlet } from "react-router-dom";

export function StudentLayout() {
  return (
    <>
      <h1>Stuudent</h1>
      <Outlet />
    </>
  );
}
