# SWR 

### 🚧 주의 🚧
아래의 내용은 '이렇게 만들어지지 않았을까?' 라는 저의 뇌피셜입니다.  
시간이 난다면 라이브러리를 까보고 수정하도록 하겠습니다. 

## 데이터를 어떻게 받아올까?
아래의 한 줄이 어떻게 데이터를 받아오는걸까요 ?
``` javascript
const { data, error } = useSWR('api/person', fetcher)
```
useSWR의 인자가 무엇인지 살펴보았습니다. 

첫 번째 인자는 key입니다. 

이 key는 캐싱하는데 사용되며 key인 동시에 URL입니다.  

이 key는 두 번째 인자 fetcher에 전달됩니다.   

fetcher는 단순히 비동기 요청 함수를 wrapping한 함수 입니다.   

``` javascript
const fetcher = URL => fetch(URL).then(res => res.json())
```

그렇다면 추측해보건데 반환값은 promise 일겁니다.  

저는 의문이 들었습니다.   

```
"promise를 값으로 어떻게 받은걸까?"  
```

promise를 값으로서 다루기 위해선 후속 처리 메서드 혹은 aysnc:await을 사용해야 합니다.  

이런식으로 말이죠.

``` javascript
const Foo = async () => {
  const { data, error } = await useSWR('api/person', fetcher);
}
```

하지만 이렇게 동작하게 된다면 한 가지 문제가 발생합니다. 

저 한 줄이 다음 코드들을 blocking 해버립니다. 

side effect인거죠.

사용자는 응답이 완료된 시점까지 빈 화면을 봐야합니다. 

useSWR은 위와 같이 사용하지도, Promise를 리턴하지도 않습니다. 

그럼 어떻게 객체 destructuring을 통해 값을 얻는것일까요?

우선 반환값을 확인하기 위해 useSWR을 콘솔에 찍어봤습니다. 

``` javascript
console.log(
   useSWR('api/person', fetcher);
)
```

결과는 다음과 같았습니다. 
``` javascript
{mutate: ƒ}
  data: (...)
  error: (...)
  isValidating: (...)
  mutate: ƒ ()
  get data: ƒ data()
  get error: ƒ error()
  get isValidating: ƒ isValidating()
  [[Prototype]]: Object
```

객체입니다. 객체에요. 그렇죠 객체니깐 객체 destructuring을 하겠죠.

우리가 사용하는 data, error가 보입니다. 

뭔가 실마리를 찾은것 같습니다.

객체는 mutable 합니다.

``` javascript
const obj = { data: null }; 
const copyed = obj; // { data: null }
copyed.data = 'a';

obj // { data: 'a' }
coyped // { data: 'a' }
```

useSWR 훅 내부 동작에서 

비동기 요청에서 받은 데이터를 data 프로퍼티에 할당해주면 될 것 같습니다. 

그럼 다음과 같은 코드가 되겠네요.

``` javascript
const obj_for_SWR_return = { data: null, error: null };

funciton useSWR(api, fetcher) {
  fetcher(api)
    .then(res => obj_for_SWR_return.data = res);

  return obj_for_SWR_return;
}
```

### 요약 
요약해보겠습니다. 

useSWR의 호출시 반환값인 객체를 참조하고 있다가 비동기 요청이 완료되면 

객체의 data 또는 error 프로퍼티에 값이 담기게 되고,

변경된 상태에 따라 React가 리렌더링을 발생시키고, 상황에 맞는 jsx를 반환하게 됩니다. 

### 참고
- <https://swr.vercel.app/ko>
- <https://www.sitepoint.com/variable-assignment-mutation-javascript>  