import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";
import { useEffect, useMemo } from "react";
import { TestRunPageVM } from "../../store/tests/testRunPageVM";

export const StudentStatsPage = observer(() => {
  const root = useStores();
  const testRunStore = useMemo(() => new TestRunPageVM(root), [root]);
  const { init } = testRunStore;
  useEffect(() => {
    init();
  }, [init]);

  console.log(testRunStore.store.filteredQuestions);
  return <div></div>;
});
