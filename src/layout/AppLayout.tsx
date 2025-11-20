import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/login">Логин</Link>
          <Link to="/student">Студент</Link>
          <Link to="/admin">Админ</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© 2025</footer>
    </>
  );
}
