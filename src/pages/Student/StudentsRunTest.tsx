import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionBlock";
import { useNavigate, useParams } from "react-router-dom";
import { Activity, useEffect, useMemo } from "react";
import { Timer } from "../../components/tests/Timer";
import { Loader } from "../../components/ui/Loader";
import ButtonStyle from "../../components/ui/ButtonStyle";
import Header from "../../components/student/Header";
import { ConfirmModal } from "../../components/ConfirmModal";
import { ResultScore } from "../../components/tests/ResultScore";
import { useStores } from "../../store/useStore";
import { TestRunPageVM } from "../../store/tests/testRunPageVM";
import { observer } from "mobx-react-lite";

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

export const StudentRunTest = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const root = useStores();
  const studentTest = useMemo(() => new TestRunPageVM(root), [root]);
  const testRun = useStores().testRunStore;
  const {
    init,
    submit: handleSubmit,
    openFinishModal,
    finishModal,
    finishModalTitle,
    confirmFinish,
  } = studentTest;
  const {
    filteredQuestions: filtredQuestion,
    loading: isLoading,
    error,
    showResult,
    totalScore,
    maxScore,
    answer,
    timeSec: second,
    setTimeLeftSec,
    setAnswer,
  } = testRun;
  const testId = Number(params.id);

  useEffect(() => {
    init();
  }, [init]);

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
          {filtredQuestion.map((q) => {
            console.log(q);
            console.log(answer);
            return (
              <QuestionBlock
                key={q.id}
                question={q}
                value={answer[q.id]?.value ?? null}
                onChange={setAnswer}
                showResult={showResult}
              />
            );
          })}
        </OptionList>
        <ContainerBox>
          <Activity mode={showResult ? "visible" : "hidden"}>
            <ResultScore score={totalScore} max={maxScore} />
          </Activity>
          <Activity mode={second ? "visible" : "hidden"}>
            <Timer
              setTime={setTimeLeftSec}
              duration={second ?? 0}
              onFinish={() => {
                if (showResult) handleSubmit(navigate);
              }}
            />
          </Activity>
        </ContainerBox>
      </Layout>

      <ButtonStyle
        title={"Отправить"}
        onClick={() => openFinishModal()}
        disabled={showResult}
      />

      <ConfirmModal
        title={finishModalTitle}
        onClose={() => openFinishModal()}
        open={finishModal}
        onConfirm={() => confirmFinish(navigate)}
        confirmLabel="Завершить"
      />
    </>
  );
});
