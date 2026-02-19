import styled from "@emotion/styled";
import type { Question } from "../types/testing";

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

type StudentsTestProps = {
  value: string | null | string[];
  question: Question;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: StudentsTestProps) {
  const { question, value, onChange } = props;

  return (
    <QuestionCard key={question.id}>
      <ContainerQuestions>
        <QuestionTitle>{question.text}</QuestionTitle>
      </ContainerQuestions>

      {question.type === "text" && (
        <TextAreaStyled
          placeholder="Введите свой ответ"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(question.id, e.target.value)}
        ></TextAreaStyled>
      )}

      {question.type === "multiple" && (
        <OptionList>
          {(question.options ?? []).map((option, i) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(option);

            return (
              <li key={i}>
                <OptionLabel htmlFor={`q-${question.id}-${i}`}>
                  <input
                    id={`q-${question.id}-${i}`}
                    type="checkbox"
                    value={option}
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? arr.filter((ch) => ch !== option)
                        : [...arr, option];
                      onChange(question.id, next);
                    }}
                  />
                  <span>{option}</span>
                </OptionLabel>
              </li>
            );
          })}
        </OptionList>
      )}

      {question.type === "single" && (
        <OptionList>
          {(question.options ?? []).map((option, i) => (
            <li key={i}>
              <OptionLabel htmlFor={`q-${question.id}-${i}`}>
                <input
                  id={`q-${question.id}-${i}`}
                  type="radio"
                  name={`q-${question.id}`}
                  aria-label={`Option ${i} q-${question.id}`}
                  checked={value === option}
                  onChange={() => onChange(question.id, option)}
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
