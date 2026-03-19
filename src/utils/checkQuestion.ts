import type { AnswerValue, CheckResult, Question } from "../types/testing";

export function checkQuestion(
  question: Question,
  answer: AnswerValue | undefined,
): CheckResult {
  console.log(question, answer);
  const ok = answer?.value === question.correct;

  if (!answer) {
    return {
      max: question.score,
      answer: 0,
      status: "skipped",
    };
  }

  if (!question.correct) {
    return {
      max: question.score,
      answer: 0,
      status: "wrong",
    };
  }

  if (question.type === "text") {
    return {
      max: question.score,
      answer: ok ? question.score : 0,
      status: ok ? "correct" : "warning",
    };
  }

  if (question.type === "single") {
    return {
      max: question.score,
      answer: ok ? question.score : 0,
      status: ok ? "correct" : "warning",
    };
  }

  if (question.type === "multiple") {
    const userResponses = Array.isArray(answer.value) ? answer.value : [];
    const correctResponses = Array.isArray(question.correct)
      ? question.correct
      : [];

    const correctCount = userResponses.filter((cor) =>
      correctResponses.includes(cor),
    );

    const wrongCount = userResponses.filter(
      (cor) => !correctResponses.includes(cor),
    );

    console.log(correctCount);
    console.log(wrongCount);

    if (wrongCount.length > 0) {
      return {
        max: question.score,
        answer: 0,
        status: "wrong",
      };
    }

    if (correctCount.length === correctResponses.length) {
      return {
        max: question.score,
        answer: question.score,
        status: "correct",
      };
    }
  }

  return {
    max: question.score,
    answer: 0,
    status: "wrong"
  };
}
