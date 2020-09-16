import pkg from "rxjs";
const {Subject} = pkg;

/*
* Subject
*  - 대표적인 Hot Observable
*  - Subject는 읽기 쓰기가 가능한 Observable이다.
*
* */

const subject = new Subject();

// observerA
subject.subscribe({
  next(value) {
    console.log(`observerA : ${value}`)
  }
})

subject.next(1);

// observerB
subject.subscribe({
  next(value) {
    console.log(`observerB : ${value}`)
  }
})

subject.next(2);





