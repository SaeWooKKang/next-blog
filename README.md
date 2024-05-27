# Next Blog

**Next**로 만든 블로그 입니다.

상태관리는 **SWR**을 사용하였으며,

페이지는 **SSG** 방식,

배포는 **Vercel**을 사용했습니다.

## 폴더 구조

- 📂common: 도메인에 종속적이지 않은 로직들
- 📂pages: url 기준으로 폴더 depth를 구성
- 📂shared: 2개 이상의 도메인에서 사용되는 로직들
- 📂styles: 전역적으로 사용하는 스타일

```
 📦src
 ┣ 📂common        # 도메인에 종속적이지 않은 로직들
 ┃ ┣ 📂component
 ┃ ┗ 📂util
 ┣ 📂pages         # url 기준으로 폴더 depth를 구성
 ┃ ┣ 📂posts
 ┃ ┃ ┗ 📂component # 해당 페이지에서 사용하는 컴포넌트(colocation하게 사용하는 페이지에 작성)
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂shared        # 2개 이상의 도메인에서 사용되는 로직들
 ┃ ┣ 📂component
 ┃ ┗ 📂service
 ┗ 📂style        # 전역적으로 사용하는 스타일
```
