import { makeAutoObservable } from "mobx";
import type { RootStore } from "../rootStore";

export class StudentTestPageVM {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  init() {
    this.store.load();
  }

  onFiltersChange() {
    this.store.setFilterTests();
  }

  get store() {
    return this.rootStore.testsCatalogStore;
  }

  get loading() {
    return this.store.loading;
  }

  get error() {
    return this.store.error;
  }

  get visibleTests() {
    return this.store.tests;
  }

  get lastAttemptByTest() {
    return this.store.lastAttemptByTest;
  }
}
