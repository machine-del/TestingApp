import { useEffect, useMemo } from "react";
import { TestCard } from "../../components/tests/TestCard";
import styled from "@emotion/styled";
import { useStores } from "../../store/useStore";
import { observer } from "mobx-react-lite";
import { StudentTestPageVM } from "../../store/tests/StudentTestPageVM";
import Header from "../../components/student/Header";

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const StudentsTestPage = observer(() => {
  const root = useStores();
  const studentTest = useMemo(() => new StudentTestPageVM(root), [root]);
  const testsCatalog = useStores().testsCatalogStore;
  const { init, lastAttemptByTest } = studentTest;
  const { tests, loading: isLoading, error } = testsCatalog;
  const title = "Тестирования";

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading) return <div className="custom-loader" />;
  if (error) return <h3>{error}</h3>;

  return (
    <section>
      <Header title={title} />

      <Cards>
        {tests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            lastAttempt={lastAttemptByTest.get(test.id)}
          />
        ))}
      </Cards>
    </section>
  );
});
