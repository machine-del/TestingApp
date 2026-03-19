export class Counter {
    value: number;

    constructor(value: number = 0)
    {
        this.value = value;
    }

    increment(): number {
        return ++this.value;
    }

    decrement(): number {
        return --this.value;
    }

    reset(): number {
        return this.value = 0;
    }
}