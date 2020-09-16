import pkg, {throwError} from "rxjs";
const {Observable, of, range, fromEvent, from, interval, empty} = pkg;

/*
* Observable
*  - 시간을 축으로 연속적인 데이터를 저장하는 컬렉션을 표현한 객체, 모든 데이터는 Observable로 만들수 있다.
*  - 데이터와 상태를 Observer에게 전달
*  - 상태 전달
*     - 데이터 전달시 에러가 발생할 수 있고, 데이터가 종료되어 더 이상 데이터를 전달하지 못하는 경우도 있기 때문에 상태도 같이 전달한다.
*     - next() : 데이터 전달
*     - error() : 에러가 발생 했을 경우
*     - complete() : 데이터 전달이 완료 되었으면
*
*  Observable의 특징
*   - 모든 데이터는 Observable 인스턴스로 만들 수 있다.
*   - Observable은 읽기 전용이다.
*   - Observable은 리액티브하다.
*   - Observable은 불변객체이다.
*
*
*  Cold Observable과 Hot Observable
*   Cold Observable
*     - 데이터 주체 생성이 내부에서 된다. 데이터 영역이 Observer마다 독립적이다.
*     - Observer와의 관계 1:1
*     - Observable
*
*
*   Hot Observable
*     - 데이터 주체 생성이 외부에서 된다. N개의 Observer와 공유한다.
*     - Observer와의 관계 1:N
*     - fromEvent(외부 Dom으로 부터 데이터가 생성되어 오는)에 의해 생성된 Observable, ConnectableObservable, Subject
*
*
*
*
*
*
* */
const numbers = new Observable(function subscribe(observer) {

  try {
    observer.next(1)
    observer.next(2)

    // 예외 발생
    //throw new Error('데이터 전달 도중 에러가 발생했습니다.')

    // 에러가 발생하거나 complete가 호출되면 구독을 자동으로 해지하기 때문에 Observable로부터 데이터를 전달 받을 수 없다.
    observer.next(3)

    // 더 이상 데이터를 전달하지 않는 경우 complete 사용
    observer.complete()

  } catch (e) {
    // 에러 전달
    observer.error(e)
  }
});

// 구독
const numbersSubscription = numbers.subscribe({
  next : value => console.log(value),
  error : e => console.log(e.toString()),
  complete : () => console.log('완료')
})

// 구독 해제
numbersSubscription.unsubscribe()
/*
* 에러처리, 자원 해제와 같은 반복적인 처리를 미리 해놓은 함수를 제공한다. 가급적 Observable을 생성할 때는 아래 함수를 사용하자.
*
*
* of
*   - 단일 데이터 값을 전달하는 Observable을 만들 때 사용
*   - 모든 값이 전달되면 complete을 호출하고 구독을 자동으로 해제한다.
*
* range
*   - 범위 내 수의 값을을 전달하는 Observable을 만들 때 사용
*   - 모든 값이 전달되면 complete을 호출하고 구독을 자동으로 해제한다.
*
* fromEvent
*   - 브라우저에서 발생하는 Event를 Observable로 만들 때 사용
*   - 이벤트 핸들러를 등록하여 자원을 사용하고 잇는 경우이기 때문에 이벤트 핸들러를 제거하기 전 까진 자원을 해제하지 않는다.
*   - unsubscribe를 호출하여 자원을 해제해야 한다.
*
* from
*   - 배열, iterabel, Promise등 거의 모든 데이터를 Observable을 만들 때 사용
*   - 모든 값이 전달되면 complete을 호출하고 구독을 자동으로 해제한다.
*
* interval
*   - 지정된 시간 간격마다 0부터 1씩 증가하는 데이터를 Observable을 만들 때 사용
*   - 애니메이션과 같이 일정 간격의 시간마다 데이터 변경이 일어나는 작업을 할 때 주로 사용
*
* empty
*   - Observable 완료 상태를 전달하는 Observable 생성
*   - 읽기 전용인 Observable은 자신의 상태를 바꾸지 못함. empty()로 상황에 따라 완료 되었다는 것을 사용자에게 알려준다.
*
* throwError
*   - Observable 에러 상태를 전달하는 Observable 생성
*
* never
*   - 아무것도 하지 않는 Observable 생성
*   - 상태(완료, 에러)를 변경하지 않으면서 전달된 데이터를 전달하지 않고자 할 때 사용
*
* */
console.log('=== of ===')
of(1, 2, 3).subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})

console.log('=== range ===')
range(1, 3).subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})

/*
console.log('=== fromEvent ===')
fromEvent(document, 'click').subscribe({
  next : value => console.log('clicked'),
  error : e => console.error(e),
  complete: () => console.log('완료')
})
*/

console.log('=== from ===')
from([1, 2, 3]).subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})

console.log('=== interval ===')
interval(300).subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})

/*
console.log('=== empty ===')
of(1, -2, 3).pipe(
  map(number => number < 0 ? empty() : number)
). subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})

console.log('=== throwError ===')
of(1, -2, 3).pipe(
  map(number => number < 0 ? throwError('number > 0') : number)
). subscribe({
  next : console.log,
  error : console.error,
  complete: () => console.log('완료')
})
*/



