import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";

export const StudentStatsPage = observer(() => {
  const title = useStores().testRunStore;
  return (
    <div>
      <h1>{title.value}</h1>
    </div>
  );
});
