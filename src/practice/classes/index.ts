import { Counter } from './Counter';


console.log("Counter - 1")
const counter = new Counter(50);
console.log(counter.value)
console.log(counter.increment())
console.log(counter.decrement())
console.log(counter.reset())

console.log("Counter - 2")
const counter2 = new Counter(50);
console.log(counter2.value)
console.log(counter2.increment())
console.log(counter2.decrement())

console.log("counter: " + counter.increment())
console.log("counter2: " + counter2.decrement())
