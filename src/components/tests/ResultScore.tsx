import styled from "@emotion/styled";

const Result = styled.div`
  background-color: #edffee;
  height: 132px;
  max-width: 321px;
  border-radius: 10px;
  padding: 20px 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const TitleRes = styled.h4`
  color: #00c63f;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
`;

const Value = styled.div`
  color: #00c63f;
  font-size: 66px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0px;
`;

type ResultScoreProps = {
  score: number;
  max: number;
};

export function ResultScore(props: ResultScoreProps) {
  const { score, max } = props;

  return (
    <Result>
      <TitleRes>Баллы</TitleRes>
      <Value>
        {score}/{max}
      </Value>
    </Result>
  );
}
