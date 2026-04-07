import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { StoreProvider } from "../store/StoreProvider";

export function AppLayout() {
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main>
        <StoreProvider>
          <Outlet />
        </StoreProvider>
      </main>
      <footer>© 2025</footer>
    </>
  );
}
