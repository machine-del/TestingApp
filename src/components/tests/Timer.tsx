import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const WrapperTimer = styled.aside<{ danger: boolean }>`
  color: ${(p) => (p.danger ? "#DF0000" : "#1E7EE8")};
  border: 1px solid ${(p) => (p.danger ? "#FFD7D7" : "#84CAFF")};
  background-color: ${(p) => (p.danger ? "#ffcdcd" : "#FCFEFF")};

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
  onFinish: () => void;
};

export default function Timer(props: TimerProps) {
  const { duration, onFinish } = props;
  const [count, setCount] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c: number) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0 && onFinish) {
      onFinish();
    }
  }, [count, onFinish]);

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
  }

  const danger = count <= duration / 4;

  return (
    <>
      <WrapperTimer danger={danger}>
        <h4 className="timer-title">Осталось времени:</h4>
        <div className="time">{formatTime(count)}</div>
      </WrapperTimer>
    </>
  );
}
