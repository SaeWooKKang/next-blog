---
title: 'Redux 핵심 개념 이해하기'
date: '2022-7-26 10:00:00'
description: ''
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'redux, 리덕스, 상태관리, flux, mvc'
---

## 목차

- MVC 패턴에서 Flux패턴으로
- React에서 Redux를 사용하는 이유
- Redux 순서
- 핵심개념 Action, Dispatch, Reducer 이해하기

## MVC 패턴에서 Flux패턴으로

MVC 패턴은

Model에 의해 View가 변경되고

View에 의해 Model이 변경되는

**양방향** 데이터 흐름을 가집니다.

![mvc](/assets/blog/mvc.png)

규모가 작은 서비스에선 유용할 수 있지만

서비스의 규모가 커질수록 데이터 흐름을 추적하기 어려워집니다.

![mvc-complex](/assets/blog/mvc-complex.png)

양방향 데이터 흐름의 단점을 보완한것이 **Flux 패턴** 입니다.

![flux](/assets/blog/flux.png)

MVC 패턴이 양방향 데이터 흐름인 반면,

Flux 패턴은 단방향 데이터 흐름을 갖습니다.

Flux 패턴을 기반으로 구현된 라이브러리가 **Redux**입니다.

Redux는 React에서 주로 사용하긴 하지만

React에 종속적이진 않습니다.

그렇다면 React에서 Redux는 어떤 장점이 있기에 쓸까요?

## React에서 Redux를 사용하는 이유

크게 다음 두가지 이유가 있을것 같습니다.

- 전역 상태관리
- 단방향 데이터 흐름

리액트에선 동일한 상태를 사용하는 컴포넌트들 중 최상위 컴포넌트에서 상태를 정의하고

자손 컴포넌트에 props로 상태를 내려주게 됩니다.

'상위 컴포넌트 -> 하위 컴포넌트'로 state를 전달해서

상태 변화를 추적하기엔 쉽지만

컴포넌트가 중첩될수록 수많은 자손 컴포넌트를 거쳐

해당 상태를 사용하는 컴포넌트에 전달되어야 한다는 단점(props drilling)을 갖습니다.

![redux](/assets/blog/redux.png)

리덕스를 사용하면 단방향 데이터 흐름의 장점을 유지하면서도

해당 컴포넌트에서 전역 저장소의 필요한 상태를 구독하여 사용할 수 있습니다.

## Redux 순서

리덕스의 순서는 다음과 같습니다.

![redux-sequence](/assets/blog/redux-sequence.png)

유저의 버튼 클릭과 같은 UI 이벤트에 의해 등록된 이벤트 핸들러가 실행되고

dispatch에 의해 action을 리듀서에 전달하면

리듀서는 액션의 타입에 따라

store의 state를 변경합니다.

순서대로 핵심 용어들을 살펴보겠습니다.

## 핵심 개념 Action, Dispatch, Reducer 이해하기

### Action
액션은 타입과, payload로 이루어진 객체입니다.

todo를 작성하는 액션을 만들어보면 다음과 같습니다.

``` javascript
const addTodo = {
  type: ‘ADD_TODO’,
  paload: ‘Eating breakfast’
};
```

payload에는 state에 추가될 값을 넣는데

위와같이 하드코딩 하게 되면 사용자의 입력에 대응 할 수 없으므로

함수로 만들어 여러 input에 대응할 수 있게 작성합니다.

``` javascript
const addTodo = data => {
  return {type: ‘ADD_TODO’, payload: data };
};
```

액션을 반환하는 함수를 ‘액션 크리에이터’라고 합니다.

### Dispatch
Action은 객체이므로 액션 자체만으론 Reducer에 전달되지 않습니다.

Dispatch 함수를 사용하여 액션을 Reducer에 전달 합니다.

Dispatch 함수는 인자로 액션을 받습니다.

``` javascript
const handleButtonClick = text => {
  dispatch(addTodo(text));
};
```

위의 handleButtonClick함수는

버튼 클릭시 input에 입력된 text를 인자로 받아

addTodo 액션 크리에이터로 액션을 만들고

이를 dispatch 함수를 이용해 reducer에게 전달해줍니다.

### Reducer
리듀서는 순수 함수 입니다.

첫 번째 인자로 이전 상태가 들어오고

두 번째 인자로 dipatch로 전달된 액션을 받습니다.

전달받은 액션의 타입에 따라 값을 반환하고

반환된 값으로 상태가 변경됩니다.

``` javascript
const todoReducer = (prevState, action) => {
  switch (action.type){
    case ‘ADD_TODO’:
      return […prevState, action.payload];
    case ‘DELETE_TODO’:
      return // 삭제..
    case ‘DELAY_TODO:
      reutrn // 연기..
  }
};
```

위에서 dispatch한 액션의 타입은 ‘ADD_TODO’ 이므로

‘ADD_TODO’ 케이스가 실행되고

기존 배열과 전달받은 새로운 todo가 추가된 새로운 상태를 반환하면

Reducer에서 반환된 값으로 상태가 변경 됩니다.
