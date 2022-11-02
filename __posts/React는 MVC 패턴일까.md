---
title: 'React는 MVC 패턴일까?'
date: '2022-11-02 21:22:00'
description: 'MVC 찾아 삼만리'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'React, 리액트, 디자인패턴, MVC'
---

## 작성 이유

최근 읽은 책에서 React를 MVC 패턴의 예로 설명하는 것을 읽고

정확히 어떤 부분이 Model, View, Controller 인지에 대해서 궁금해졌습니다. 

하지만 책에서는 구체적인 예시를 찾아볼 수 없었습니다.

궁금증을 해결하고자 찾아보았고, 제가 이해한 내용을 작성하게 되었습니다. 

## MVC(Model View Controller)란?

애플리케이션 구성 요소를 3가지 역할로 구분한 개발 방법론입니다.

모든 로직을 한 군데 작성하면 당연히 유지 보수하기 어렵습니다. 

따라서 3가지 구성 요소로 나누고

데이터와 관련된 **Model**과

사용자에게 보이는 부분 **View**

둘을 연결해 주는 **Controller**로 나누어 개발했습니다. 

추후에 유지 보수 시 사용자에게 보이는 부분인 View를 변경할 경우

View만을 변경하면 되고, 

[비즈니스 로직](https://ko.wikipedia.org/wiki/%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4_%EB%A1%9C%EC%A7%81)이 변경될 경우 Model만 변경하면 되므로 유지 보수가 편리하게 됩니다.

또한 MVC 패턴은 Model과 View 사이에 Controller를 둬서 의존도를 낮출 수 있습니다. 

## MPA, SSR에서의 MVC
현재 우리는 CSR 방식(리액트)의 프레임워크를 많이 사용하지만

MVC는 SSR 기반에서 탄생했습니다.

MPA 기반 SSR 방식으로 MVC 패턴 흐름에 대해 작성해 보겠습니다. 

POST의 요청의 경우 클라이언트는 form 태그를 사용해 데이터를 서버로 전송하고 

서버의 Controller는 사용자의 요청을 분석해(사용자가 요청한 path)

사용자한테 받은 request.body를 Model에 요청하고 응답받아서 

View에 전달하고 View는 템플릿에 data를 결합하고 Controller에 전달해 주고,

전달받은 View를 Controller는 사용자에게 응답해 주는 흐름을 갖습니다.

의사 코드는 다음과 같습니다.

``` javascript
// 의사 코드
const Controller = (request.body) => {
  const model = new Model(request.body)
  
  const html = new View(model)
  
  return html
}
```
## React에서 MVC 끼워 맞추기

React는 SPA 기반의 CSR 방식입니다. 

유저의 최초 요청 시 서버로부터 응답받은 빈 html에 JS를 이용하여 View를 동적으로 생성합니다.

또한 페이지 이동시에는 서버에 요청하지 않고

클라이언트 측 router에 의해 해당 페이지의 컴포넌트가 동적으로 DOM에 마운트 됩니다. 

View에 대한 부분은 명확한 것 같습니다.

그럼 Controller 부분은 어느 부분으로 설명해야 할까요? 

(서버로 요청하고 응답받는 부분으로 설명해야 할까요??)

Model은 뭘로 설명해야 할까요?

(서버측 DB일까요?? 아니면 useState에 저장된 client측 상태가 진정한 의미의 Model일까요??)

SSR 방식에서 이해한 MVC 패턴을 CSR에서 그대로 적용하기엔 애매한 것 같습니다. 

**작은 관점**에서

사용자가 html(View)을 변경시키고, 

이벤트 핸들러(Controller)가 이를 캐치하고, 

상태(Model)를 변경하는 것으로 

'리액트는 MVC 패턴이다'라고 설명할 수 있을 것도 같습니다.

하지만 접근 방식이 틀린 것 같습니다. 

패턴에 코드를 맞추는 것이 아닌,

좀 더 **큰 관점**에서 React를 바라봐야 할 것 같습니다.

리액트는 상태에 따라서 View를 만들어 줄 뿐입니다.  

``` javascript
View = React(state) 
```

또한 리액트 공식문서에서 다음과 같이 MVC 패턴이 아니라고 설명하고 있습니다.

(결론은 정해져 있었다!!)

![react는mvc패턴이 아니다.](/assets/blog/react-mvc.png)
*https://ko.reactjs.org/blog/2013/06/05/why-react.html*

## 결론
리액트 자체는 MVC 패턴이 아닙니다. 

하지만 내부적으로 폴더 구조를 어떻게 가져가고 

코드를 어떻게 작성하냐에 따라

리액트를 MVC 패턴, MVVM 패턴 등 다양한 디자인 패턴을 적용할 수 있을것 같습니다.

### 참조

- <https://ko.wikipedia.org/wiki/%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4_%EB%A1%9C%EC%A7%81>
- <https://developer.mozilla.org/ko/docs/Glossary/MVC>
- <https://ko.reactjs.org/blog/2013/06/05/why-react.html>
- <https://www.youtube.com/watch?v=Y5vOfv67h8A&t=227s>
- <https://www.youtube.com/watch?v=ogaXW6KPc8I&t=258s>
