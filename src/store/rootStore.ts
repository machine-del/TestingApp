import { testRunStore } from "./tests/testRunStore";
import testsCatalogStore from "./tests/testsCatalogStore";

export class RootStore {
  testRunStore: testRunStore;
  testsCatalogStore: testsCatalogStore;

  constructor() {
    this.testRunStore = new testRunStore(this);
    this.testsCatalogStore = new testsCatalogStore();
  }
}

export const rootStore = new RootStore();
