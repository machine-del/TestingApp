import { makeAutoObservable } from "mobx";

export class testRunStore {
  value: string = "Hello testRunStore";
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export class Counter {
  value: number;

  constructor(value: number = 0) {
    // makeObservable(this, {
    //   increment: action,
    //   decrement: action,
    //   reset: action,
    // });

    makeAutoObservable(this, {}, { autoBind: true });
    this.value = value;
  }

  increment() {
    ++this.value;
  }

  decrement() {
    if (this.value == 0) return;

    --this.value;
  }

  reset() {
    this.value = 0;
  }
}
