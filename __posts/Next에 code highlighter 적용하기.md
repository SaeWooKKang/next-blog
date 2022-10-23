---
title: 'Next에 code highlighter 적용하기'
date: '2022-10-20 21:40:00'
description: 'highlighter.js로 CSR 말고 prism.js로 SSG 하자'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'highlighter.js, prism.js, ssg, csr, 최적화, next blog, optimization'
---

## 문제 

처음엔 코드 하이라이터로 많이 쓰이는 highlighter.js를 사용해 보았습니다. 

적용 순서는 다음과 같습니다. 

1. highlight.js와 사용할 theme 가져오기
2. useEffect로 html이 DOM에 마운트된후 hljs.initHighlighting 메서드를 호출하기

함수가 실행되면 'pre \> code' 태그에 class를 달아주고, css가 적용됩니다. 

``` javascript
// pages/posts/[id].tsx
import hljs from 'highlight.js';
import 'highlight.js/styles/color-brewer.css'; // 원하는 theme 적용
// 선택 사항.
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript);

const Posts = () => {
  const html = "<pre><code>const highlighter = 'prism'</code></pre>";

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return <article dangerouslySetInnerHTML= { __html: html };
  );
}
```

## 고민 

하지만 useEffect에서 함수를 호출하면 client 측에서 실행되므로 build 결과물에 highlight.js 모듈이 '포함'됩니다.

아래는 analyze 라이브러리로 bundle을 확인한 결과입니다. 

![use_highlighter](/assets/blog/use_highlighter.png)  
*analyze 라이브러리로 bundle을 확인한 결과*

저는 pre-render 함수에서 코드 하이라이터를 사용하여 빌드 결과물에 포함되지 않길 원했습니다. 

highlight.js는 node 환경에서도 사용할 수 있지만, 모든 태그가 포함된 파일에서 'pre \> code' 태그 부분적으로만 적용하는 것은 어려웠습니다. 

## 해결

찾아본 결과 마크다운 파일을 html 태그로 파싱할때 쓰는 remark와 결합하여 사용하는 prism.js를 쓰기로 했습니다. 

1. remark로 markdown을 html로 만들때 체이닝으로 use(remarkPrism)를 추가

``` typescript
import { remark } from "remark";
import html from "remark-html";
import remarkPrism from "remark-prism";

export const  markdownToHTML = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism)
    .process(markdown);
  
  return result.value;
}
```

2. getStaticProps에서 호출

``` typescript
// pages/posts/[id].tsx
export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const md = fs.readFileSync(`__posts/${ id }.md`, "utf-8");
  const { content, data: meta } = matter(md); // gray-matter 라이브러리 입니다.
  const HTML = await markdownToHTML(content);
  const post = { meta, html: HTML };

  return { props: { post }};
}
```

3. 사용할 theme 추가

``` javascript
// pages/posts/[id].tsx
import "prismjs/themes/prism-solarizedlight.css";

const Posts = ({ post }) => {
  return <article dangerouslySetInnerHTML= { __html: post };
  );
}
```

코드 하이라이터가 잘 적용된 것을 볼 수 있습니다. 

![apply](/assets/blog/apply.png)

하나의 css 파일을 제외하곤 깔끔하게 제외된 것을 확인할 수 있었습니다 :)

![remark_nothing_found](/assets/blog/use_prism.png)
*analyze 라이브러리로 bundle을 확인한 결과*

### 참고

- <https://highlightjs.readthedocs.io/en/latest/api.html#highlight>
- <https://css-tricks.com/syntax-highlighting-prism-on-a-next-js-site/>
- <https://dev.to/kontent_ai/how-to-use-highlight-js-on-a-next-js-site-f9>
- <https://github.com/highlightjs/highlight.js/blob/main/README.md>
- <https://prismjs.com/>
- <https://github.com/prismjs/prism-themes/blob/HEAD/themes/prism-one-light.css>