---
title: 'CRA 프로젝트 craco로 styled-components debugger 설정하기'
date: '2023-02-25 16:45:00'
description: '#snippet'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: '#snippet'
---
![styled-components-debugger](/assets/blog/styled-components.png)*App__StyledContainer-\<hash key\>: App.tsx 파일에서 style-components로 만든 StyledContainer의 className*
### 1. craco 설치 

**npm**
``` 
npm i @craco/craco 
```

**yarn**
```
yarn add @craco/craco
```

### 2. styled-components & plugin 설치 

**npm**
```
npm install --save styled-components
npm install --save-dev @types/styled-components
npm install --save-dev babel-plugin-styled-components
```
**yarn** 
```
yarn add styled-components
yarn add -D @types/styled-components
yarn add -D babel-plugin-styled-components

```

### 3. craco.config.ts 파일 생성
``` ts
module.exports = {
  webpack: {
    configure: {
      entry: './src',
    },
  },
  babel: {
    "plugins": [
      [
        "babel-plugin-styled-components",
        {
          "fileName": true,
          "displayName": true,
        }
      ]
    ]
  }
};
```

### 4. pakage.json script 수정
```json
"scripts": {
  ...
    "start": "react-scripts start" // delete
    "start": "craco start", // use
  },
  ...
```

### Reference

- <https://styled-components.com/docs/tooling>
- <https://craco.js.org/docs/configuration/babel/>
- <https://craco.js.org/docs/configuration/webpack/>
