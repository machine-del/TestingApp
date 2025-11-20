import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/student", { replace: true });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} method="POST">
        <div>
          <input type="email" />
        </div>
        <div>
          <input type="password" />
        </div>
        <button type="submit">Войти</button>
      </form>
    </>
  );
}
