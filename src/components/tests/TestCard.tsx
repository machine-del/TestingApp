import styled from "@emotion/styled";
import type { Attempt, TestItem } from "../types/testing";
import ScoreImage from "../../assets/Vector 3.png";
import { CalendarIcon, DoneIcon, RetryIcon, TimeIcon } from "../../icons/icons";
import { useNavigate } from "react-router-dom";

const Card = styled.article`
  border: 1px solid #dde2e4;
  border-radius: 12px;
  padding: 34px 16px 15px 22px;
  position: relative;
`;

const TitleCard = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1;
  color: #09090b;
`;

const CardText = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 400;
  line-height: 2;
  color: #09090b;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  padding: 7px 12px;
  color: #0e73f6;
  border: 1px solid #0e73f680;
  border-radius: 10px;
`;

const ScoreData = styled.div`
  background-image: url(${ScoreImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 77px;
  height: 101px;
  position: absolute;
  right: 35px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreMin = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 26.6px;
  line-height: 100%;
  color: #0e73f6;
`;

const ScoreMaxValue = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 26.6px;
  line-height: 100%;
  letter-spacing: -0.88px;
  color: #0e73f64d;
`;

const Times = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Time = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  padding: 7px 12px;
  color: #0e73f6;
  gap: 3px;
  display: flex;
  align-items: center;
  border: 1px solid #f4f9ff;
  background-color: #f4f9ff;
  border-radius: 10px;
`;

const Calendar = styled.div`
  gap: 3px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  padding: 7px 12px;
  color: #fff;
  border: 1px solid #ffa528;
  background-color: #ffa528;
  border-radius: 10px;
`;

export const BlockBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
  border: 1px solid transparent;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DoneBtn = styled(BaseButton)`
  background-color: #00c63f;
  border-color: #00c63f;
`;

export const StartBtn = styled(BaseButton)`
  background-color: #0e73f6;
  border-color: #0e73f6;
`;

export const RetryBtn = styled(BaseButton)`
  background-color: #fff;
  border-color: #dde2e4;
  color: #09090b;
`;

type TestCardProps = {
  test: TestItem;
  lastAttempt?: Attempt | null;
};

export function TestCard(props: TestCardProps) {
  const { test, lastAttempt } = props;
  const navigate = useNavigate();
  function formateDate(date?: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString("ru-RU");
  }

  function formatMinutes(seconds?: number | null): string | null {
    if (!seconds) return null;

    const minutes = Math.round(seconds / 60);

    let wordForm = "минут";

    const lastDigit = minutes % 10;
    const lastTwoDigits = minutes % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      wordForm = "минута";
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      (lastTwoDigits < 12 || lastTwoDigits > 14)
    ) {
      wordForm = "минуты";
    }

    return `${minutes} ${wordForm}`;
  }

  const deadline = formateDate(lastAttempt?.finishedAt);
  const duration = formatMinutes(lastAttempt?.timeSpent);
  const isGraded = lastAttempt?.status === "graded";
  const scoreText = isGraded ? Math.trunc(lastAttempt?.score / 10) : null;

  function actionBtn() {
    if (isGraded && !test.allowRetry)
      return { status: "done", label: "Выполнено" };
    if (isGraded && test.allowRetry)
      return { status: "retry", label: "Пройти заново" };
    return { status: "start", label: "Пройти" };
  }

  function handleClick() {
    if (actionBtn().status === "done") return;
    navigate(`/student/test/${test.id}`, {
      state: { durationSec: test.durationSec },
    });
  }

  return (
    <Card>
      <TitleCard>{test.title}</TitleCard>
      <CardText>{test.shortDescription}</CardText>

      <Tags>
        {test.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </Tags>

      <Times>
        {!!deadline && (
          <Calendar>
            <CalendarIcon />
            {deadline}
          </Calendar>
        )}
        {!!duration && (
          <Time>
            <TimeIcon />
            {duration}
          </Time>
        )}
      </Times>

      <BlockBtn>
        {actionBtn().status === "done" && (
          <DoneBtn disabled>
            {actionBtn().label} <DoneIcon />
          </DoneBtn>
        )}

        {actionBtn().status === "start" && (
          <StartBtn onClick={() => handleClick()}>{actionBtn().label}</StartBtn>
        )}

        {actionBtn().status === "retry" && (
          <RetryBtn onClick={() => handleClick()}>
            {actionBtn().label} <RetryIcon />
          </RetryBtn>
        )}
      </BlockBtn>

      {scoreText && (
        <ScoreData>
          <ScoreMin>{scoreText}</ScoreMin>
          <ScoreMaxValue>/10</ScoreMaxValue>
        </ScoreData>
      )}
    </Card>
  );
}
