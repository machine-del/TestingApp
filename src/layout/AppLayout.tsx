import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";

export function AppLayout() {
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© 2025</footer>
    </>
  );
}
