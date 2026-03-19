import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const WrapperTimer = styled.aside<{ danger: boolean; finished: boolean }>`
  color: ${(p) => {
    if (p.finished) return "#475569";
    return p.danger ? "#e00000" : "#1b5de0";
  }};
  border: 1px solid ${(p) => {
    if (p.finished) return "#e5e7eb";
    return p.danger ? "#ffb3b3" : "#cfe0ff";
  }};
  background-color: ${(p) => {
    if (p.finished) return "#f8fafc";
    return p.danger ? "#fff1f1" : "#f8faff";
  }};

  height: 132px;
  max-width: 321px;
  border-radius: 10px;
  padding: 20px 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  .timer-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
  }

  .time {
    font-size: 66px;
    font-weight: 700;
    line-height: 1;
  }
`;

type TimerProps = {
  duration: number;
  onFinish?: () => void;
  finished?: boolean;
  setTime?: (time: number) => void;
};

export function Timer(props: TimerProps) {
  const { duration, onFinish, setTime, finished = false } = props;
  const [count, setCount] = useState(duration);
  // const [timeIsOver, setTimeIsOver] = useState(false);

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setCount((c: number) => {
        if (c <= 1) {
          clearInterval(interval);
          // setTimeIsOver(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    // if (!timeIsOver) return;
    if (count === 0 && onFinish) {
      onFinish();
    }

    if (setTime) setTime(count);
  }, [count, onFinish]);

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
  }

  const danger = count <= duration / 4 && !finished;
  const userTime = finished ? "Время решения" : "Осталось времени:";

  return (
    <>
      <WrapperTimer danger={danger} finished={finished}>
        <h4 className="timer-title">{userTime}</h4>
        <div className="time">{formatTime(count)}</div>
      </WrapperTimer>
    </>
  );
}
