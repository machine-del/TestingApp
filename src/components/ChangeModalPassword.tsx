import styled from "@emotion/styled";
import { Modal } from "./ui/Modal";
import { useState } from "react";

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 8px;
`;

const ContainerButton = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  flex: 1 1 calc(50% - 10px);

  &:hover {
    background: #ff0000ff;
    color: #fff;
  }
`;
const SaveButton = styled.button<{ variant: "primary" | "default" }>`
  display: flex;
  flex: 1 1 calc(50% - 10px);
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: ${({ variant }) =>
    variant === "primary" ? "#4094f7e5" : "#e5e5e5"};
  color: #fff;
  padding: 8px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) =>
      variant === "default" ? "#e5e5e5" : "#2d83f5"};
  }
`;

const TextError = styled.pre`
  color: red;
  font-size: 12px;
  white-space: pre-wrap;
`;

type ChangeModalPasswordProps = {
  open: boolean;
  onClose: (v: boolean) => void;
  onSuccess: () => void;
};

export default function ChangeModalPassword(props: ChangeModalPasswordProps) {
  const { open, onClose, onSuccess } = props;
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [touchPass1, setTouchPass1] = useState(false);
  const [touchPass2, setTouchPass2] = useState(false);
  const [error, setError] = useState("");

  const MOCK_USER_ID = 1;
  const MOCK_USER_PASSWORD = "Password123`!@";

  function validatePassword(pw: string): string[] {
    const error: string[] = [];

    if (pw.length < 8) error.push("Пароль должен быть больше 8-ми символов");
    if (!/^(?=.*[A-Z])/.test(pw)) error.push("Хотя бы одна заглавная буква");
    if (!/^(?=.*[a-z])/.test(pw)) error.push("Хотя бы одна строчная буква");
    if (!/[0-9]/.test(pw)) error.push("Хотя бы одна цифра");
    if (!/[@$~#$!?^/*_-]/.test(pw)) error.push("Хотя бы один спец. символ");
    // if (pass1 === MOCK_USER_PASSWORD) error.push("Пароли совпадают");

    return error;
  }

  const pwError = validatePassword(pass1);
  const mathError =
    pass1 && pass2 && pass1 !== pass2 ? "Пароли не совпадают" : "";
  const formValid = pass1 !== "" && pass2 !== "" && pwError.length === 0;

  function mockChangePass(userId: number, newPw: string) {
    let promise = new Promise((res, rej) => {
      setTimeout(() => {
        if (newPw.toLowerCase().includes("passw"))
          rej(setError("Пароль простой"));
        else res;
      }, 1000);
    });
    console.log(promise);
  }

  async function onSubmit() {
    if (!formValid) {
      setError(mathError);
      return;
    }
    setTouchPass1(false);
    setTouchPass2(false);
    try {
      await mockChangePass(MOCK_USER_ID, pass1);
      onClose(false);
      onSuccess();
      setPass1("");
      setPass2("");
    } catch (err) {
      setError(mathError);
    }
  }

  return (
    <Modal onClose={() => onClose(false)} open={open} title="Сменить пароль">
      <label>
        Новый пароль
        <StyledInput
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          onBlur={() => setTouchPass1(true)}
          type="password"
        />
      </label>
      <label>
        Повторите пароль
        <StyledInput
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          onBlur={() => setTouchPass2(true)}
          type="password"
        />
        <TextError>{mathError}</TextError>
        {/* {touchPass2 && <h3>Повторите пароль точь-в-точь</h3>} */}
      </label>
      {error && <h3>{error}</h3>}
      <ContainerButton>
        <CancelButton onClick={() => onClose(false)}>Отменить</CancelButton>
        <SaveButton
          variant={formValid ? "primary" : "default"}
          disabled={!formValid}
          onClick={() => onSubmit()}
        >
          {" "}
          Подтвердить
        </SaveButton>
      </ContainerButton>
      {touchPass1 && <TextError>{pwError.join("\n")}</TextError>}
    </Modal>
  );
}
