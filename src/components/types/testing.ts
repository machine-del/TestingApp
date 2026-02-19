export type Attempt = {
  id: number;
  testId: number;
  userId: number;
  score: number;
  startedAt: string;
  finishedAt: string;
  timeSpent: number;
  status: "submitted" | "graded" | "in_progress";
};

export type TestMeta = {
  project: string;
  track: string;
  course: string;
  purpose: string;
};

export type TestItem = {
  id: number;
  title: string;
  shortDescription: string;
  durationSec: number;
  passScore: number;
  attemptsAllowed: number;
  allowRetry: number;
  isPublished: boolean;
  tags: string[];
  deadlineISO: string;
  meta: TestMeta;
  attempts: Attempt[];
};

export type QuestionType = "text" | "multiple" | "single";

export type Question = {
  id: number;
  testId: number;
  type: QuestionType;
  text: string;
  options: string[];
  correct: string;
  score: number;
};
