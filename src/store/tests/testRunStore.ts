import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "../rootStore";
import type {
  AnswerState,
  CheckResult,
  Question,
  TestItem,
} from "../../types/testing";
import { checkQuestion } from "../../utils/checkQuestion";

export class testRunStore {
  test: TestItem | null = null;
  testId: number | null = null;
  testIsPublished: boolean | null = null;
  rootStore: RootStore;
  allQuestion: Question[] = [];
  answer: AnswerState = {};
  loading: boolean = true;
  error: string = "";
  showResult: boolean = false;
  timeSec: number = 0;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  get store() {
    return this.rootStore.testsCatalogStore;
  }

  get durationSec(): number {
    return this.test?.durationSec ?? 600;
  }

  get filteredQuestions(): Question[] {
    if (this.testId === null) return [];
    return this.allQuestion?.filter((q) => this.testId == q.testId);
  }

  get totalCount(): number {
    return this.allQuestion.length;
  }

  get answeredCount(): number {
    return Object.values(this.answer).filter((a) => {
      if (a.type === "single") return a.value !== null;
      if (a.type === "multiple")
        return Array.isArray(a.value) && a.value.length > 0;
      if (a.type === "text")
        return typeof a.value === "string" && a.value.trim() !== "";
      return false;
    }).length;
  }

  get allAnswered(): boolean {
    const totalCount = this.allQuestion.length;
    return this.answeredCount === totalCount;
  }

  get results(): CheckResult[] {
    return this.allQuestion.map((q) => checkQuestion(q, this.answer[q.id]));
  }

  get totalScore(): number {
    return this.results.reduce((acc, v) => acc + v.answer, 0);
  }

  get maxScore(): number {
    return this.results.reduce((acc, v) => acc + v.max, 0);
  }

  get spentSec(): number {
    return this.durationSec - this.timeSec;
  }

  setTimeLeftSec(value: number): void {
    this.timeSec = value;
  }

  setShowResult(value: boolean) {
    this.showResult = value;
  }

  setAnswer(questionId: number, value: string | string[] | null) {
    const prev = this.answer[questionId];

    if (prev === null) return;

    return {
      ...prev,
      [questionId]: {
        ...prev,
        value,
      },
    };
  }

  reset() {
    this.test = null;
    this.testId = null;
    this.testIsPublished = null;
    this.allQuestion = [];
    this.answer = {};
    this.loading = true;
    this.error = "";
    this.showResult = false;
    this.timeSec = 0;
  }

  async start(test: number) {
    this.reset();
    this.testId = test;
  }

  async loadData() {
    this.reset();
    this.testId = 1;
    const tests = "/public/data/tests.json";
    const questions = "/public/data/questions.json";

    try {
      const [testsRes, questionsRes] = await Promise.all([
        fetch(tests),
        fetch(questions),
      ]);
      if (!testsRes.ok) throw new Error(testsRes.status.toString());
      if (!questionsRes.ok) throw new Error(questionsRes.status.toString());
      const t = await testsRes.json();
      const a = await questionsRes.json();
      const testFound = t.find((x: TestItem) => x.id === this.testId);
      const questionsTest = a.filter((x: Question) => x.testId === this.testId);

      const answInitial: AnswerState = {};
      for (const q of questionsTest) {
        answInitial[q.id] = {
          type: q.type,
          value: q.type === "multiple" ? [] : null,
        };
      }

      runInAction(() => {
        if (!Array.isArray(t) && !Array.isArray(a)) {
          throw new Error("Некорректные данные");
        }

        this.test = testFound;
        this.allQuestion = questionsTest;
        this.timeSec = testFound.durationSec ?? 600;
        this.answer = answInitial;
      });
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
