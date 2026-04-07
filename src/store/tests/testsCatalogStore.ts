import { makeAutoObservable, runInAction } from "mobx";
import type { Attempt, TestItem } from "../../types/testing";

class testsCatalogStore {
  tests: TestItem[] = [];
  attempts: Attempt[] = [];
  loading: boolean = true;
  error: string = "";
  userId: number = 1;
  filter = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilterTests() {}

  async load() {
    this.tests = [];
    this.attempts = [];
    this.loading = true;
    const tests = "/public/data/tests.json";
    const attempts = "/public/data/attempts.json";

    try {
      const [testsRes, attemptsRes] = await Promise.all([
        fetch(tests),
        fetch(attempts),
      ]);
      if (!testsRes.ok) throw new Error(testsRes.status.toString());
      if (!attemptsRes.ok) throw new Error(attemptsRes.status.toString());
      const r = await testsRes.json();
      const a = await attemptsRes.json();
      runInAction(() => {
        if (!Array.isArray(r) && !Array.isArray(a)) {
          throw new Error("Некорректные данные");
        }
        this.tests = r;
        this.attempts = a;
      });
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
    } finally {
      this.loading = false;
    }
  }

  get lastAttemptByTest() {
    const unique = new Map();
    const mine = this.attempts.filter((a) => a.userId === this.userId);
    for (const element of mine) unique.set(element.userId, element);
    return unique;
  }

  get visibleTests() {
    return this.tests.filter((t) => t.isPublished);
  }
}

export default testsCatalogStore;
