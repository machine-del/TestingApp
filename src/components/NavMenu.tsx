import { Link, NavLink } from "react-router-dom";
import "../index.css";

export function NavMenu() {
  return (
    <>
      <nav>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Логин
        </NavLink>
        <NavLink
          to="/student"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Студент
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Админ
        </NavLink>
        <Link to="/student/tests" state={{ some: "value" }}>
          Tests
        </Link>
      </nav>
    </>
  );
}
