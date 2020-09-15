/*
* Promise
*   - 비동기 작업들을 순차적으로 진행하거나 병렬로 진행하는 등 컨트롤을 가능하게 하는 기능 지원
*
* 상태
*   pending
*     - 아직 약속을 수행중인 상태
*
*   fulfilled
*     - 약속이 지켜진 상태
*
*   rejected
*     - 약속이 못 지켜진 상태
*
*   settled
*     - 약속이 지켜졌든 아니든 결론이 난 상태
* */

const promise = (param) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (param) {
        resolve('완료') // fulfilled
      } else {
        reject('실패')  // rejected
      }
    }, 3000)
  })
}

promise(false)             // 리턴된 Promise 객체
  .then(t => console.log(t))     // 정상일 때 (fulfilled)
  .catch(e => console.error(e))  // 에러일 때 (rejected), 결과가 정상이여도 체이닝 형태로 연결된 상태에서 에러가 나면 catch에서 처리

/*
* Promise.all
*   - 여러 프로미스가 모두 완료될 때 실행
*
* */
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise1 완료')
    resolve()
  }, 3000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise2 완료')
    resolve()
  }, 1000)
})

Promise.all([promise1, promise2]).then(() => {
  console.log('promise1, promise2 완료')
})

