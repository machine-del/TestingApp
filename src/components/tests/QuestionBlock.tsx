import styled from "@emotion/styled";
import type { CheckResult, Question } from "../../types/testing";
import { Activity, useState } from "react";

const OptionLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
`;

const QuestionCard = styled.article`
  width: 100%;
  max-width: 792px;
  height: 100%;
  background: transparent;
  border: 1px solid #efefef;
  border-radius: 12px;
  margin: 20px;
  list-style: none;
  padding: 16px;
  overflow: hidden;
`;

const QuestionTitle = styled.h4`
  color: #09090b;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

const ContainerQuestions = styled.div`
  padding: 34px 0;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
  font-size: 18px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: -2.2%;
`;

const TextAreaStyled = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding: 16px;
  width: 100%;
  height: 100%;
  max-height: 89px;
`;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  list-style: none;
`;

type QuestionBlockProps = {
  value: string | null | string[];
  question: Question;
  result?: CheckResult;
  showResult?: boolean;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { question, value, onChange, showResult, result } = props;
  const { id, options = [], type, text, correct, score, shuffle } = question;

  const [statusText, setStatusText] = useState<"correct" | "warning" | "wrong">(
    "wrong",
  );

  function getOptionState(
    option: string,
  ): "correct" | "warning" | "wrong" | undefined {
    if (type === "multiple") {
      const arr = Array.isArray(value) ? value : [];
      const cor = Array.isArray(correct) ? correct : [];

      if (arr.includes(option) && cor.includes(option)) {
        return "correct";
      }
    }

    if (type === "single") {
      if (value === option && option === correct) return "correct";
      if (value !== option && option === correct) return "wrong";
    }

    return undefined;
  }

  return (
    <QuestionCard key={id}>
      {/* <legend>{statusText}</legend> */}
      {/* <div>
        <Activity mode={showResult ? "visible" : "hidden"}>{result}</Activity>
      </div> */}

      <ContainerQuestions>
        <QuestionTitle>{text}</QuestionTitle>
      </ContainerQuestions>

      {type === "text" && (
        <TextAreaStyled
          placeholder="Введите свой ответ"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(id, e.target.value)}
        ></TextAreaStyled>
      )}

      {type === "multiple" && (
        <OptionList>
          {(options ?? []).map((option, i) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(option);

            return (
              <li key={i}>
                <OptionLabel htmlFor={`q-${id}-${i}`}>
                  <input
                    id={`q-${id}-${i}`}
                    type="checkbox"
                    value={option}
                    checked={checked}
                    onChange={() => {
                      getOptionState(option);
                      const next = checked
                        ? arr.filter((ch) => ch !== option)
                        : [...arr, option];
                      onChange(id, next);
                    }}
                  />
                  <span>{option}</span>
                </OptionLabel>
              </li>
            );
          })}
        </OptionList>
      )}

      {type === "single" && (
        <OptionList>
          {(options ?? []).map((option, i) => (
            <li key={i}>
              <OptionLabel htmlFor={`q-${id}-${i}`}>
                <input
                  id={`q-${id}-${i}`}
                  type="radio"
                  name={`q-${id}`}
                  aria-label={`Option ${i} q-${id}`}
                  checked={value === option}
                  onChange={() => onChange(id, option)}
                />
                <span>{option}</span>
              </OptionLabel>
            </li>
          ))}
        </OptionList>
      )}
    </QuestionCard>
  );
}
