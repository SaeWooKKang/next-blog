---
title: 'Next로 font 최적화하기'
date: '2022-10-19 16:57:00'
description: '적용만 했는데 최적화라고?'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'next, 프레임워크, font, 최적화, optimization'
---

# Next로 font 최적화하기

## 문제

google font를 cdn으로 사용할 경우의 흐름은 다음과 같습니다. 

```
웹 페이지 요청 - html 응답 - 렌더링 - font 요청과 응답 - 리렌더링
```

개발자도구 오른쪽 하단을 보시면 font가 다운받아지면서 문서에 font가 입혀지는것을 볼 수 있습니다.  

![font-rendering](/assets/blog/font_rendering.gif)

## 해결

_document파일에 cdn을 달게 되면 build시 인라인에서 사용한 폰트들을 최적화하여 html파일에 포함시켜 주고, 이를 바탕으로 렌더링하게 됩니다. 

아래는 html파일에 포함된 최적화된 폰트 코드 입니다. 

![optimize-font](/assets/blog/font_optimization.png)

폰트 네트워크 요청 단계가 사라져서 지연 시간만큼 빠르게 문서에 입혀지겠네요!

```
웹 페이지 요청 - html 응답 - 렌더링
```


## 적용 방법

1. _document에 cdn 추가
``` javascript
// _document
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        /** 구글 폰트 적용 **/
        <link 
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap" 
          rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

2. css파일에 font-family 추가

``` javascript
// style/global.css
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'IBM Plex Sans KR', sans-serif;
}
```

### 추가
그렇다고 cdn 요청을 안하는건 아닙니다. 여전히 html head에 포함되어 있고, 요청을 합니다.

![optimize-font](/assets/blog/font_cdn.png)

### 참고
- <https://nextjs.org/docs/basic-features/font-optimization>