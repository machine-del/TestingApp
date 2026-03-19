import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionBlock";
import { useNavigate, useParams } from "react-router-dom";
import { Activity, useEffect, useMemo, useState } from "react";
import type { AnswerState, Question, TestItem } from "../../types/testing";
import { Timer } from "../../components/tests/Timer";
import { Loader } from "../../components/ui/Loader";
import ButtonStyle from "../../components/ui/ButtonStyle";
import Header from "../../components/student/Header";
import { ConfirmModal } from "../../components/ConfirmModal";
import { checkQuestion } from "../../utils/checkQuestion";
import { ResultScore } from "../../components/tests/ResultScore";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
`;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  list-style: none;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

// type AnswerValueType = {
//   value: string | string[] | null;
// };

export default function StudentRunTest() {
  const params = useParams();
  const navigate = useNavigate();
  const testId = Number(params.id);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [testData, setTestData] = useState<TestItem | null>();
  const durationSecond = testData?.durationSec ?? 600;
  const [answer, setAnswer] = useState<AnswerState>({});
  const [second, setSecond] = useState(durationSecond);
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

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

  useEffect(() => {
    if (!testData) return;
    setSecond(testData?.durationSec);
  }, [testData]);

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

  const results = useMemo(() => {
    return filtredQuestion.map((q) => checkQuestion(q, answer[q.id]));
  }, [answer, filtredQuestion]);

  console.log(results);

  const totalCount = filtredQuestion.length;
  const allAnswered = answeredCount === totalCount;

  const resultScore = results.reduce((acc, v) => {
    return v.answer + acc;
  }, 0);

  const totalScore = results.reduce((acc, v) => {
    return acc + v.max;
  }, 0);

  const title = allAnswered
    ? "Завершить тест?"
    : `Не все задания выполнены ${answeredCount + " / " + totalCount}, хотите завершить?`;

  function handleSubmit() {
    // const payload = {
    //   testId,
    //   answers: answer,
    //   timeSpent: second,
    // };
    // console.log(payload);
    setShowResult(true);

    let spentSeconds = durationSecond - second;

    if (testData?.allowRetry && testData.attemptsAllowed > 1) {
      navigate(`/student/test/${testId}/result`, {
        replace: true,
        state: {
          max: totalScore,
          score: resultScore,
          attempts: testData.attemptsAllowed - 1,
          time: spentSeconds,
          finish: showResult,
        },
      });
    }
  }

  function confirmFinish() {
    setIsOpenConfirmModal(false);
    handleSubmit();
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
              showResult={showResult}
            />
          ))}
        </OptionList>
        <ContainerBox>
          <Activity mode={showResult ? "visible" : "hidden"}>
            <ResultScore score={resultScore} max={totalScore} />
          </Activity>
          <Activity mode={second ? "visible" : "hidden"}>
            <Timer
              setTime={setSecond}
              duration={second ?? 0}
              onFinish={() => {
                if (showResult) handleSubmit();
              }}
            />
          </Activity>
        </ContainerBox>
      </Layout>

      <ButtonStyle
        title={"Отправить"}
        onClick={() => setIsOpenConfirmModal(true)}
        disabled={showResult}
      />

      <ConfirmModal
        title={title}
        onClose={() => setIsOpenConfirmModal(false)}
        open={isOpenConfirmModal}
        onConfirm={confirmFinish}
        confirmLabel="Завершить"
      />
    </>
  );
}
