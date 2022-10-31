---
title: 'Client-Server간 네트워크 요청 흐름 정리'
date: '2022-10-31 21:28:00'
description: 'CSR, SSR, MPA, SPA를 이해해보자!'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'CSR, SSR, MPA, SPA, 네트워크, 요청, 흐름, React, Next'
---

웹의 발전 흐름순으로 작성했습니다. 

## 목차

- [용어 설명](##용어-설명)
- [MPA](#MPA)
- [MPA 기반 SSR](#MPA-기반-SSR)
- [SPA 기반 CSR](#SPA-기반-CSR)
- [SPA 기반 SSR](#SPA-기반-SSR)
- [장단점 정리](#장단점-정리)


## 용어 설명
아래 글에 나올 용어를 먼저 정리해 보겠습니다. 

#### MPA(Multiple Page Application)
```
html 파일이 여러개인 애플리케이션입니다.
```
#### SPA(Single Page Application)
```
html 파일이 하나인 애플리케이션입니다.
```
#### SSR(Server Side Rendering)
```
변경되는 데이터(상태) 결합을 서버측에서 합니다.
```
#### CSR(Clinet Side Rendering)
```
변경되는 데이터(상태) 결합을 클라이언트 측에서 합니다.
```
#### Ajax(Asynchronous JavaScript And XML)
Ajax란 js에서 비동기 방식으로 

서버에 XMLHTTPRequest, fetch, axios를 사용하여 요청하고 응답받아 

웹 페이지를 동적으로 갱신하는 프로그래밍 방식을 뜻합니다. 

요즘은 xml보다는 json을 사용하여 데이터를 주고받지만 

당시 XML 기반으로 데이터를 주고받아서 이름에 XML이 들어갔습니다.

## MPA

![MPA](/assets/blog/mpa.png)

### 요청 흐름 
1. 최초 방문
2. 서버에서 하드 코딩으로 만들어진 html 응답
3. 유저의 새로운 요청
4. 서버에서 하드 코딩으로 만들어진 html 응답

초창기 웹의 client-server간 요청, 응답 방식입니다. 

모든 클라이언트 요청에 대해서 서버는 미리 하드코딩하여 만들어 놓은 html을 응답해 줍니다.

#### 단점
모든 html 페이지를 하드코딩하여 만드는 방식은 매우 비효율적이고 불가능에 가깝습니다.

## MPA 기반 SSR
![MPA-SSR](/assets/blog/mpa_ssr.png)

### 요청 흐름
1. 최초 방문
2. 미리 만들어놓은 html 템플릿에 data 결합
3. html 응답
4. 유저의 새로운 요청
5. 미리 만들어놓은 html 템플릿에 data 결합
6. html 응답


클라이언트 요청 시 미리 만들어둔 템플릿에 

상태를 **서버측**에서 결합하여 새로운 html을 응답해 주는 방식입니다. (ex PHP, JSP)

#### 단점
모든 클라이언트에 대해서 html 파일을 응답해 주는 것은 서버와 클라이언트 모두 비효율적입니다.

서버는 모든 요청에 대해 데이터를 결합하여 html을 응답해 줘야 하고,

클라이언트 측에선 작은 변경사항일지라도 새로 응답받은 html 전체를 렌더링 해야 합니다.

## SPA 기반 CSR
![SPA-CSR](/assets/blog/spa_csr.png)

### 요청흐름
1. 최초 방문 
2. 빈 html 응답
3. script 태그의 js 요청
4. JS 응답
5. 유저의 요청(Ajax)
6. JSON 응답

React로 예를 들어보겠습니다. 

최초 방문 시 서버는 빈 html 파일을 응답해 주고 

클라이언트의 브라우저는 html을 파싱 하다가 script 태그를 만나면 

해당 script의 src 속성의 주소로 서버로 JS를 요청(3번) 합니다. 

서버는 react를 응답해 주고 클라이언트 측에서 JS(리액트)를 파싱 하며 동적으로 DOM을 생성합니다. 

DOM의 생성이 완료되면(React가 mount 되면), 

리액트의 생명주기 메서드인 componentDidMount(useEffect)가 실행되고

해당 메서드 내에서 작성된 데이터에 대한 비동기 요청(6번)을 보냅니다.

응답받은 데이터를 useState 훅을 사용하여 상태로 저장하면 

리렌더링되어 데이터가 결합된 화면을 보여줍니다.

이후 모든 사용자 인터렉션은 추가적인 html을 요청 및 응답받지 않고,

4번에서 응답받은 JS를 이용하여 DOM을 생성 합니다. 

또한 변경되는 데이터는 클라이언트 측에서 Ajax 방식으로 페이지를 동적으로 변경시킵니다. 

#### 단점
최초 방문 시 응답받은 html 파일(2번)은 비어있으므로 검색엔진이 수집할 만한 데이터가 거의 없습니다. 따라서 SEO 최적화가 어렵습니다. 

#### 추가로 알면 좋은것
react에서 a 태그의 click 이벤트 핸들러에 e.preventDefault로 브라우저의 html 요청에 대한 기본 동작을 막는 이유는 

React는 SPA 기반이고, 이미 4번에서 모든 html을 그릴 수 있는 JS 코드를 받아왔기 때문에

기본동작인 새로운 html 요청을 막는 것입니다. 

## SPA 기반 SSR
![SPA-SSR](/assets/blog/spa_ssr.png)

### 요청흐름
1. 최초 방문 
2. 미리 만들어놓은 html 템플릿에 data 결합
3. html 응답
4. script 태그의 js 요청
5. JS 응답
6. 유저의 새로운 요청(Ajax)
7. JSON 응답

최초 방문 시 서버는 사용자가 요청한 URL에 해당하는 html에 데이터(상태)를 결합(2번)하여 html을 응답해 줍니다. 

응답받은 html을 브라우저에서 렌더링을 하여 클라이언트는 페이지를 빠르게 볼 수 있지만,

아직 JS가 입혀지지 않았기에 유저의 인터렉션에 반응할 수 없는 상태입니다. 

또한 브라우저는 DOM을 생성하면서 script 태그의 src 속성 주소로 JS를 병렬로 요청(4) 합니다.
(scipt 태그에 defer 키워드 작성시 병렬 요청이 가능합니다.)

이후 응답받은 JS가 hydration되어 유저의 인터렉션에 반응할 수 있는 상태가 됩니다. 

이후의 모든 클라이언트 요청에 대해선 5번에서 받은 JS로 DOM을 생성하고, 변경되는 데이터는 Ajax 방식을 사용합니다.

## 장단점 정리 

SSR 방식의 '장점'은 서버 측에서 데이터를 결합하여 **완성된 html**을 응답해 주므로 

검색 엔진 최적화가 가능하고, FCP(First Contentful Paint)가 빠르다는 장점이 있습니다. 

SSR 방식의 '단점'으로는 TTV(Time To view)와 TTI(Time To Interaction)가 달라서 JS가 입혀지기 전까진

사용자의 인터렉션에 응답할 수 없습니다. 

CSR 방식의 '장점'은 TTV == TTI가 같다는 점과 CDN을 통한 TTFB(Time to First Byte)가 빠르다는 점, JS로 DOM을 동적으로 생성하므로 페이지 전환이 부드러워 사용자 경험이 좋다는 점이 있습니다. 

CSR 방식의 '단점'으로는 검색엔진 최적화가 어렵고, JS bundle 크기가 크다면 사용자는 JS를 다운받고, 파싱 될 때까지 흰 화면을 오래 봐야 하고 이 때문에 FCP가 느리다는 단점이 있습니다. 따라서 최적화를 통해 초기 bundle 크기를 줄이는 것이 중요합니다.
