---
title: 'type을 집합으로 생각하기'
date: '2023-7-30 19:00:00'
description: ''
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'typescript, 집합'
---

## string에서 string 찾기

변수 ALPHABET1의 요소의 타입은 string이고, 변수 a1의 타입은 string 입니다.

```ts
const ALPHABET1 = ['a', 'b', 'c']; // string[]
let a1 = 'a'; // string

ALPHABET1.includes(a1); // ✅
```

string 집합에서 에서 string을 찾는것은 가능합니다.

<figure>
  <img src="/assets/blog/string_string.svg" alt="apply" width="300px">
  <figcaption style="width: 300px; color: #979797">string ∈ string</figcaption>
</figure>


## string에서 문자 literal 찾기

변수 ALPHABET2의 요소의 타입은 string이고, 변수 a2의 타입은 'a' 리터럴 타입입니다.

```ts
const ALPHABET2 = ['a', 'b', 'c']; // string[]
const a2 = 'a'; // 'a'
ALPHABET2.includes(a2); // ✅
```

string 집합에서 'a'를 찾는것은 가능합니다.

<figure>
  <img src="/assets/blog/string_a.svg" alt="apply" width="300px">
  <figcaption style="width: 300px; color: #979797">'a' ∈ string</figcaption>
</figure>


## literal에서 literal 찾기

ALPHABET3의 요소의 타입은 'a', 'b', 'c' 이고, 변수 a3의 타입은 'a' 리터럴 타입입니다.

```ts
const ALPHABET3 = ['a','b','c'] as const; // readonly ["a", "b", "c"]
const a3 = 'a';
ALPHABET3.includes(a3); // ✅
```

'a', 'b', 'c'를 원소로 갖는 집합에서 'a'를 찾는것은 가능합니다.

<figure>
  <img src="/assets/blog/abc_a.svg" alt="apply" width="300px">
  <figcaption style="width: 300px; color: #979797">'a' ∈ {'a', 'b', 'c'}</figcaption>
</figure>



## literal 에서 string 찾기

ALPHABET4의 요소의 타입은 'a', 'b', 'c' 이고, 변수 a4의 타입은 string 입니다.

```ts
const ALPHABET4 = ['a', 'b', 'c'] as const; // readonly ["a", "b", "c"]
let a4 = 'a'; // string;
ALPHABET4.includes(a4); // ❌
```

원소 'a', 'b', 'c'를 갖는 집합에서 상위 집합인 string를 찾는것은 불가능합니다.

<figure>
  <img src="/assets/blog/string_abc.svg" alt="apply" width="300px">
  <figcaption style="width: 300px; color: #979797">string ∉ {'a', 'b', 'c'}</figcaption>
</figure>

## 실전 예시

아래는 실제로 꽤나 유용한 패턴입니다.

food에서 fruit를 포함하고 있는지 찾아보겠습니다.

```ts
const fruit = ['apple', 'banana', 'mango'] as const; // readonly ["apple", "banana", "mango"]

const food = ['apple', 'rice']; // string[]
```

string 타입인 food를 "apple", "banana", "mango"를 원소로 갖는 집합에서 찾을 수 없습니다. 따라서 타입 오류가 발생합니다.

```ts
food.find(food => fruit.includes(food)); // ❌
```

반대로 typescript를 집합으로 생각한다면

string을 원소로 갖는 집합에서 "apple", "banana", "mango"를 원소로 갖는 집합은 찾을 수 있습니다.
```ts
fruit.find(fruit => foods.includes(fruit)); // ✅
```



