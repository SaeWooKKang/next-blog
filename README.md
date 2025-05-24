# Next Blog

**Next**로 만든 블로그 입니다.

페이지는 **SSG** 방식으로 빌드,

배포는 **s3** + **cloudfront**를 사용했습니다.

## CI/CD

<img src="https://github.com/SaeWooKKang/next-blog/assets/87258182/093e042d-76be-4eef-9da7-7dae38ff8d42" height="400px"/>

## 폴더 구조

- 📂common: 도메인에 종속적이지 않은 로직들
- 📂domain: 도메인에 해당하는 로직들
- 📂shared: 2개 이상의 도메인에서 사용되는 로직들
- 📂pages: url 기준으로 폴더 depth를 구성
- 📂styles: 전역적으로 사용하는 스타일

```
 📦src
 ┣ 📂domain        # 도메인에 해당하는 로직들
 ┃ ┗ 📂blog
 ┣ 📂common        # 도메인에 종속적이지 않은 로직들
 ┃ ┣ 📂component
 ┃ ┗ 📂util
 ┣ 📂pages         # url 기준으로 폴더 depth를 구성
 ┃ ┣ 📂posts
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂shared        # 2개 이상의 도메인에서 사용되는 로직들
 ┃ ┣ 📂component
 ┃ ┗ 📂service
 ┗ 📂style        # 전역적으로 사용하는 스타일
```
