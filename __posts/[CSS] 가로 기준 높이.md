---
title: '[CSS] 가로 기준 높이'
date: '2023-01-18 21:28:00'
description: '#snippet #css'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'height, width, ratio, Horizontal reference height snippet'
---

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
  <style>
    .container {
      background-color: greenyellow;
      width: 100%;
      padding-top: 100%;
      position: relative;
    }
    .text {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;

      background-color: blue;

      /* display: flex;
      align-items: center;
      justify-content: center; */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="text">text</div>
  </div>
</body>
</html>
```

### reference
- <https://www.w3schools.com/howto/howto_css_aspect_ratio.asp>