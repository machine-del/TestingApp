import { Counter } from "../practice/classes/Counter";
import { testRunStore } from "./tests/testRunStore";
import testsCatalogStore from "./tests/testsCatalogStore";

export class RootStore {
  counter: Counter;
  testRunStore: testRunStore;
  testsCatalogStore: testsCatalogStore;

  constructor() {
    this.counter = new Counter();
    this.testRunStore = new testRunStore();
    this.testsCatalogStore = new testsCatalogStore();
  }
}

export const rootStore = new RootStore();
