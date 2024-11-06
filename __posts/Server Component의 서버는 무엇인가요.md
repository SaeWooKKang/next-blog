---
title: 'Server Component의 서버는 무엇인가요?'
date: '2024-11-06 19:47:00'
description: ''
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'React, Next.js, 서버 컴포넌트, server component, App router'
---

이번 포스팅에서는 제가 Server Component의 Server가 무엇인지 깨닫게 된 과정을 말해보고자 합니다.

## Next.js 첫 프로젝트: 블로그
서버 컴포넌트가 도입된지도 [2년이 넘었다.](https://react.dev/blog/2022/03/29/react-v18)

2022년 10월 당시 지금의 블로그를 Next.js v13.2.4으로 만들었었다. 

그때 당시에도 [App directory](https://nextjs.org/blog/next-13)는 사용가능했다. 

하지만 베타 버전이었고 의견이 분분했었다. (물론 지금도)

사실 취준생 입장에서 React를 배우고 Next.js의 다양한 렌더링 방식들을 습득하는것도 난이도가 있었다.

그래서 App directory를 사용하지 않고, Page 라우터에서 SSG(Static Site Generation) 방식으로 렌더링하여 블로그를 개발했다. 

\> 🚧 참고: App directory에서 App router로 [명칭이 변경](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)되었다. 

## Next.js 두 번째 프로젝트: 회사 프로젝트

그렇게 시간이 흘렀고, 22년 11월에 회사에 입사하여 2024년 연초쯤 Next.js 13 버전을 사용해서 신규 프로젝트를 진행했었다. 

App router에 대해서 잘 몰랐기에 Next에서 공식적으로 제공하는 [Learn Next.js](https://nextjs.org/learn)를 통해 학습했었다. 

학습 하는 과정에서 만난 경로 오타에 대해서 issue를 작성하기도 했었다. (next learn은 오픈소스는 아니다. 문제가 있을 경우 [issue 제기만 가능](https://github.com/vercel/next-learn?tab=readme-ov-file#contributions)하다.)


## Server Component의 서버는 웹 서버 아니었어?

당연하게 서버 컴포넌트의 서버는 AWS의 EC2같은 '웹 서버'를 지칭하는줄 알았다. 

스터디에서 팀원 분과 이야기 도중 블로그에 관한 이야기가 나왔고, Next.js 버전과 App router에 대한 이야기가 나왔다. 

나는 퇴사이후 v13.2.4에서 v14.2.3로 [마이그레이션](https://github.com/SaeWooKKang/next-blog/commit/2997f9c05ffca6ec6f5b16696589e72d793af4f0#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L16)을 진행했어서 v14이라고 말씀드렸다. 

그런데 왜 'App router'를 사용하지 않았는지 팀원분께서 여쭤보셨다. 

다음과 같은 말을 했었다.

<br />

**'App router를 사용하면 서버를 띄워야 하는데, 블로그에는 불필요한 것 같아요.'**

<br />

팀원 분께서 '재영님께서 잘못 알고 계신 것 같아요.'라고 말씀해 주셨다.

엥..? 내가 잘못 알고 있다고? 서버 컴포넌트인데 서버가 필요 없다고? 

## App router의 Route handler를 사용해서 rss를 구현하다.
그렇게 1~2주 정도가 지났다.

기업의 블로그의 경우 rss를 제공하고 이를 rss 피드를 통해 구독할 수 있었다. 신기했다.

나의 블로그도 rss 피드를 제공하는 기능을 구현해보기로 결심했다.

처음엔 rss 피드를 빌드 시점에 생성할 생각으로 script를 작성했었다.

타입스크립트로 작성했는데, 타입스크립트 파일을 실행하기 위해선 js로 트랜스파일하고 실행하는 과정이 필요했다.

tsc 혹은 ts-node같은 라이브러리 필요했던 것이다.

또 다른 문제로 script 실행 환경은 CJS이고, 개발 환경은 ESM이라 기존의 코드를 import해서 재사용할 수 없었다. 

따라서 [JS로 코드를 중복하여 작성](https://github.com/SaeWooKKang/next-blog/commit/efd1fe76a85092265946a8f96de1093ee8448386)하여 해결했다.

그런데 정말 이게 최선일까? 싶은 생각이 들었다. 

<br />

찾아본 결과 App router에서는 [Route handler를 통해 rss를 생성](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#non-ui-responses)할 수 있었다.

Route handler는 [Next.js v13.2](https://nextjs.org/blog/next-13-2#custom-route-handlers)에서 도입되었던지라 나의 블로그 버전에서 사용할 수는 있었다.

그렇지만 `App router` == `Server component` == `웹 서버` 라 생각했었고 웹 서버를 사용할 생각이 없어서, 

Router handler를 사용하기 위해선 빌드 시점에 rss를 생성할 수 있는지가 관건이었다.

빌드를 돌려본 결과 **빌드 시점에 rss를 생성**할 수 있었다. 

그렇게 기존 script로 작성했던 rss를 [Route Handler를 사용해서 재작성](https://github.com/SaeWooKKang/next-blog/commit/89ec9c16b7ddf57c9bbcdaf7a2c6aa0b30993d7c#diff-b55cdbef4907b7045f32cc5360d48d262cca5f94062e353089f189f4460039e0R19)하여 서로 다른 모듈 문제와 트랜스파일 문제를 해결할 수 있었다.

<br />

해당 작업을 진행하면서 App router를 통해 rss를 생성하며 프레임워크의 효용성을 느낄 수 있었다.

그렇지만 App router를 사용해서 웹 서버 없이 빌드 했음에도 불구하고, 

Server Component의 Server가 무엇을 이야기하는지에 대해서는 연관지어 생각해보지 못했다.

## Server Component에 대해서 설명해 주세요.

또 한 번의 시간이 흘렀다.

얼마전 넥스트스텝에서 진행하는 [의식적인 연습 워크숍](https://edu.nextstep.camp/c/TC2UyGU4)에 참석했다. 

세미나 이후 의도적으로 수련 할 X를 정했다. 나는 의도적 수련 대상을 '기술 면접 잘보기'로 정했다.

그 과정속에서 매일 하나의 질문에 대해서 답변해보고, 부족한 부분을 채워넣는 학습을 하고있다. 

그러던 중 다음과 같은 질문을 작성했다.

<br />

**'Server Component에 대해서 설명해 주세요.'**

<br />

정의를 올바르게 말할 수 없었다. 

정의는 차치하고, Server Component의 Server가 무엇인지부터 찾아보기로 했다.

그렇게 공식 문서에서 [Server component 설명](https://react.dev/reference/rsc/server-components)을 읽어보았다.

<br />

```
Server Components are a new type of Component that renders ahead of time, before bundling, in an environment separate from your client app or SSR server.
서버 컴포넌트는 번들링 전에 클라이언트 앱 또는 SSR 서버와 분리된 환경에서 미리 렌더링하는 새로운 유형의 컴포넌트입니다.

This separate environment is the “server” in React Server Components. Server Components can run once at build time on your CI server, or they can be run for each request using a web server.
이 별도의 환경이 React Server 컴포넌트에서 “server”입니다. 서버 컴포넌트는 CI 서버에서 빌드 시 한 번 실행하거나 웹 서버를 사용하여 각 요청에 대해 실행할 수 있습니다.
```

<br />

그렇다. Server component의 서버는 CI server가 될 수도, 웹 서버일 수도 있는 **별도의 환경**이었다.

## 아하! App router를 CI server에서 정적 HTML로 빌드하기
앞서 Next.js에서 App Router의 router handler를 사용해서 rss를 구현했었다. 

어떻게 웹 서버 없이 빌드 시점에 생성할 수 있었을까? 

이제는 대답할 수 있을것같다. 

여기서의 서버는 **웹 서버를 지칭하는것이 아닌 CI server**인 것이다.

<br />

Next.js에서는 빌드시 Server Component를 정적 HTML로 빌드하는 기능을 [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)를 통해 제공한다.

예전에 학습을 목적으로 [호스팅을 변경하는 작업](https://github.com/SaeWooKKang/next-blog/commit/0b0870fa24ebc1c66ac48765952bd433686be78d)을 진행했는데, 그때 해당 설정을 적용해 두어서 App router를 사용 시 HTML 빌드가 된 것이었다.

## 마무리
그간의 경험을 통해 Server Component의 Server가 웹 서버만을 지칭하는 것이 아닌, 

웹 서버 혹은 CI server가 될 수 있음을 이해할 수 있었다.

공부를 하면서 문서를 안 읽어본 것은 아니다. 

다만, 그때 당시 직접 경험해 보지 않아서 크게 와닿지 않았던 것 같다.

단어 하나하나 곱씹어 보면 어땠을까 싶은 아쉬움과 부끄러움이 든다. 

아쉬움, 부끄러움의 감정이 든다는 것은 성장했다는 것을 의미하지 않을까 싶다.
