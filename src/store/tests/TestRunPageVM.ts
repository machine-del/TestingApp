import { makeAutoObservable } from "mobx";
import type { RootStore } from "../rootStore";
import { Navigate, type NavigateFunction } from "react-router-dom";

export class TestRunPageVM {
  rootStore: RootStore;
  finishModal: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  get store() {
    return this.rootStore.testRunStore;
  }

  get finishModalTitle(): string {
    return this.store.allAnswered
      ? "Завершить тест?"
      : `Не все задания выполнены ${this.store.answeredCount + " / " + this.store.totalCount}, хотите завершить?`;
  }

  closeFinishModal() {
    this.finishModal = false;
  }

  openFinishModal() {
    this.finishModal = true;
  }

  init() {
    this.store.loadData();
  }

  confirmFinish(navigate: NavigateFunction) {
    this.closeFinishModal();
    this.submit(navigate);
  }

  timerFinish(navigate: NavigateFunction) {
    this.submit(navigate);
  }

  submit(navigate: NavigateFunction) {
    const testData = this.store.test;
    const testId = this.store.testId;
    const totalScore = this.store.totalScore;
    const resultScore = this.store.results;
    const showResult = this.store.showResult;
    this.store.setShowResult(true);
    if (testData == null) return;
    if (testData?.allowRetry && testData.attemptsAllowed > 1) {
      navigate(`/student/test/${testId}/result`, {
        replace: true,
        state: {
          max: totalScore,
          score: resultScore,
          attempts: testData.attemptsAllowed - 1,
          time: this.store.spentSec,
          finish: showResult,
        },
      });
    }
  }
}
