import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/student/Header";
import { ResultScore } from "../../components/tests/ResultScore";
import { Timer } from "../../components/tests/Timer";
import { Activity } from "react";
import styled from "@emotion/styled";

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #fff;
  font-size: 14px;
  line-height: 1.71;
  font-weight: 600;
  padding: 7px 20px;
  min-width: 122px;
  border-radius: 10px;
  border: 1px solid #4094f7;
  cursor: pointer;
  transition: opacity 0.2s;
  background-color: #4094f7;

  &:hover {
    opacity: 0.9;
  }
`;

export function StudentTestResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    navigate(`student/tests`, { replace: true });
    return null;
  }

  const { attempts, max, score, time, finish } = location.state;

  function takeTheTestAgain() {
    navigate(`/student/test/${id}`, {
      replace: true,
    });
    return null;
  }

  console.log(finish);
  return (
    <div>
      <Header title={`Тестирование №${id}`} />
      <div>
        <ResultScore max={max} score={score} />
        <Timer duration={time} finished />
        <Activity mode={attempts === 0 ? "hidden" : "visible"}>
          <div>Осталось попыток: {attempts}</div>
        </Activity>
      </div>
      <Activity mode={attempts === 0 ? 'hidden' : 'visible'}>
        <BaseButton onClick={takeTheTestAgain}>Пройти заново</BaseButton>
      </Activity>
    </div>
  );
}
