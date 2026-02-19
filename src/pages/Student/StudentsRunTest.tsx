import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionBlock";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Question, TestItem } from "../../components/types/testing";
import Timer from "../../components/tests/Timer";
import { Loader } from "../../components/ui/Loader";
import ButtonStyle from "../../components/ui/ButtonStyle";
import { Modal } from "../../components/ui/Modal";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
`;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  list-style: none;
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

// type AnswerValueType = {
//   value: string | string[] | null;
// };

type AnswerValue = {
  type: "multiple" | "text" | "single";
  value: string | string[] | null;
};

type AnswerState = Record<number, AnswerValue>;

export default function StudentRunTest() {
  const params = useParams();
  const testId = Number(params.id);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [testData, setTestData] = useState<TestItem | null>();
  const durationSecond = testData?.durationSec;
  const [answer, setAnswer] = useState<AnswerState>({});
  const [second, setSecond] = useState(durationSecond);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // const location = useLocation();
  // console.log(location.state.durationSec);

  useEffect(() => {
    const data = "/public/data/questions.json";
    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Question[]) => {
        if (!Array.isArray(data)) throw new Error("Ошибка");
        setAllQuestions(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
    return () => {};
  }, [testId]);

  useEffect(() => {
    const data = "/public/data/tests.json";
    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((tests: TestItem[]) => {
        const filtredTest = tests.find((t) => t.id === testId);
        setTestData(filtredTest);
        setSecond(filtredTest?.durationSec || 600);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
    return () => {};
  }, [testId]);

  const filtredQuestion = useMemo(
    () => allQuestions.filter((q) => q.testId === testId),
    [testId, allQuestions],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswer((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      const answInitial: AnswerState = {};
      for (const q of filtredQuestion) {
        answInitial[q.id] = {
          type: q.type,
          value: q.type === "multiple" ? [] : null,
        };
      }
      return answInitial;
    });
  }, [filtredQuestion]);

  function onChange(questionId: number, value: string | string[] | null) {
    console.log("onChange", questionId, value);
    setAnswer((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        value,
      },
    }));
  }

  const answeredCount = useMemo(() => {
    return Object.values(answer).filter((a) => {
      if (a.type === "single") return a.value !== null;
      if (a.type === "multiple")
        return Array.isArray(a.value) && a.value.length > 0;
      if (a.type === "text")
        return typeof a.value === "string" && a.value.trim() !== "";
      return false;
    }).length;
  }, [answer]);

  const totalCount = allQuestions.length;
  const allAnswered = answeredCount === totalCount;

  function handleSubmit() {
    const payload = {
      testId,
      answers: answer,
      timeSpent: second,
    };
    console.log(payload);
    console.log(allAnswered + " / " + totalCount);
    console.log(totalCount);
  }

  if (Number.isNaN(testId)) {
    return (
      <section>
        <Header title="Тестирование" />
        <p style={{ color: "red", textAlign: "center" }}>
          Неверный идентификатор тестов
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <Header title={`Тестирование №${testId}`} />
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Header title={`Тестирование №${testId}`} />
        <h3>{error}</h3>
      </section>
    );
  }

  return (
    <>
      <Header title={`Тестирование №${testId}`} />

      <Layout>
        <OptionList>
          {filtredQuestion.map((q) => (
            <QuestionBlock
              key={q.id}
              question={q}
              value={answer[q.id]?.value ?? null}
              onChange={onChange}
            />
          ))}
        </OptionList>
        {second && (
          <Timer
            duration={second}
            onFinish={() => console.log("Тест отправлен")}
          />
        )}
      </Layout>
      <ButtonStyle title={"Отправить"} handleSubmit={handleSubmit} />
      {/* <Modal
        title="Хотите закончить тестирование?"
        onClose={() => false}
        open={true}
      >
        <ContainerButton>
          <CancelButton onClick={() => false}>Отменить</CancelButton>
          <SaveButton variant={!allAnswered ? "primary" : "default"}>
            {" "}
            Подтвердить
          </SaveButton>
        </ContainerButton>
      </Modal> */}
    </>
  );
}
