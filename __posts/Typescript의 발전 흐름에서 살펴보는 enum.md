---
title: "Typescript의 발전 흐름에서 살펴보는 enum"
date: "2024-04-29 22:28:00"
description: "enum vs const 단언문"
thumbnail: /thumbnails/hello-world.jpg
slug: "test3"
keyword: "typescript, enum, const 단언문"
---

`enum`은 타입스크립트 초창기시절부터 존재하던 JS에 추가된 typescript의 기능이지만, 현재 typescript의 5.5 beta 버전이 나온 시점에서도 `enum`의 사용은 효용성이 있다고 생각합니다. 그 이유에 대해서 살펴보겠습니다.

## enum은 js에 추가된 ts의 기능

많은 분들이 typescript는 javascript로 트랜스파일시 사라져서 런타임에 영향을 미치지 않는다는 사실을 알고 계실 겁니다. 현재 새롭게 추가되는 ts의 기능의 발전 방향과는 맞는 말이지만, 과거의 발전 방향은 그렇지 않았습니다.

typescript는 2012년에 발표되었습니다. 그때 당시만 하더라도 [javascript는 정체되어 있던 시기](https://www.totaltypescript.com/typescript-types-dont-exist-at-runtime#enums-namespaces-and-parameter-properties)로 여겨집니다. 따라서 다른 언어에서 유용하게 사용하는 언어적인 기능들을 사용 할 수 없었습니다. 이러한 이유로 typescript(이후 부터는 ts로 작성합니다.)는 기존 js의 기능을 확장했습니다. 그 중 대표적인 기능이 `enum`입니다.

## js에 객체로 존재하는 enum

위에서 [enum은 js에 추가된 ts의 기능](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)이라고 소개했습니다. js에는 `enum`이라는 키워드가 존재하지 않습니다. 브라우저나 Node.js는 ts에 존재하는 `enum`을 모릅니다. 결국엔 js로 변환되어야 합니다. 그렇다면 `enum`은 어떤 형태로 js에 존재하게 될까요? 다음은 `enum`이 js로 트랜스파일된 결과입니다.

```ts
// ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

```js
// js
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));
```

위에 보시는 대로 `enum`은 js에서 객체로서 존재하게 됩니다. 그래서 ts 환경에서 **타입** 뿐만 아니라 js 코드에서 **값**으로서도 다룰 수 있습니다. 이 부분에 대해선 `const` 단언문을 먼저 살펴본 후 `const` 단언문과 `enum`을 비교하여 살펴보겠습니다. 그럼 먼저 `const` 단언문에 대해 알아보겠습니다.

## const 단언문: ts환경에서 상수를 정의하는 또 다른 기능

`enum`은 [상수를 정의하는데 유용](https://www.typescriptlang.org/docs/handbook/enums.html)합니다. 그런데 ts에는 상수를 정의 할 수 있는 또 다른 기능이 있습니다. 바로 `const` 단언문 입니다.

js에서 원시형이 아닌 객체는 참조형이라 변수의 할당을 변경하지 않더라도 프로퍼티의 값을 변경하는것이 가능합니다. 다음과 같이 말이죠.

```ts
const Direction = {
  Up: 0,
};

console.log(Direction.a); // 0

Direction.Up = 11; // ok

console.log(Direction.a); // 11
```

따라서 ts는 값이 변경 될 수 있기에 타입을 넓혀([type narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)의 반대 개념)서 추론됩니다.

```ts
const Direction: {
  Up: number;
};
```

타입이 넓혀서 추론되는것은 상수를 정의할 때 꽤나 불편하게 느껴집니다. 하지만 ts 3.4버전 부터는 [`const` 단언문](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)이 추가되어 이러한 불편이 해소되었습니다. 값 할당 뒤에 `as const` 키워드로 읽기 전용의 변할 수 없음을 표현 할 수 있습니다. 읽기 전용이되어 ts 환경에서는 변경이 불가능하므로 타입 또한 넓혀지는것이 아닌 좁혀지게 됩니다.

```ts
// const assertion을 사용
const Direction = {
  Up: 0,
} as const;

// 추론된 타입
// const Direction: {
//  readonly Up: 0;
// }

// ⛔️ 값을 변경할 경우 타입 에러
Direction.Up = 3; // Cannot assign to 'Up' because it is a read-only property.
```

## const 단언문 vs enum

`const` 단언문과 `enum` 모두 상수의 집합을 처리하는데 적절할 뿐만 아니라 타입과 값 모두 사용할 수 있습니다. `const` 단언문과 `enum`의 다른점은 타입으로 다루는 방식이 다른데 이어서 살펴보겠습니다.

### enum을 type으로 다루기

enum은 type으로 소스코드 레벨에서 별도의 변환 없이 사용할 수 있을뿐만 아니라 트랜스파일시 객체로 변환되어 값으로서도 다룰 수 있습니다.

```ts
enum Direction {
  Up,
}

// 변수의 타입선언은 type으로서, 값 할당에는 값으로서 사용됩니다.
const direction: Direction = Direction.Up;
```

### const 단언문을 type으로 다루기

반면 const 단언문을 사용하면 변수로 선언한 부분(let, const)은 값이기 떄문에 js의 값을 타입으로 다루기 위해선 ts의 typeof 사용이 필요합니다. 그럼 위에서 `enum`을 `const` 단언문으로 작성해보겠습니다.

```ts
const Direction = {
  Up: 0,
} as const;

const direction: (typeof Direction)[keyof typeof Direction] = 0;
```

타입 선언부 앞에서 부터 보면 먼저 값으로 타입으로 다루기 위해서 typeof를 사용하고 객체의 키에 해당하는 값들을 뽑기 위해서 keyof typeof를 사용했습니다. 대부분 동일한 목적으로 사용할 수 있지만 다른점이 있습니다. 바로 enum은 구조적 타이핑을 따르지 않는다는것입니다. 이어서 살펴보겠습니다.

### enum은 구조적 타이핑을 따르지 않는다.

ts는 대부분의 경우 구조적 타이핑을 따릅니다. 즉, 구조가 일치하면 동일한 것으로 간주합니다. 하지만 `enum`은 이와 다르게 동작합니다. `enum`은 타입 자체와 값이 동일한 열거형에서 온 것인지를 확인합니다. (※ 숫자 `enum`은 숫자 할당이 가능하므로 구조적 타이핑을 따른다고 볼 수 있습니다.) 이러한 특징이 불편할 수 있지만, 타입이 이곳저곳 파편화 되는 코드 작성을 방지 할 수 있습니다.

```ts
enum Direction {
  Up = "up",
}

// ⛔️ type error
const direction1: Direction = "up";

// ✅
const direction2: Direction = Direction.Up;
```

### type을 값으로 다루기 vs 값을 타입으로 다루기

`enum`과 `const` 단언문은 한 쪽의 영역을 다른쪽의 영역으로 다루는것을 의미한다고 생각합니다.

그렇다면 어느 방향으로 변환하는것이 좀 더 가독성이 좋은 코드를 작성할 수 있을까요?

제 생각에는 `enum`을 쓰는것이 더 간결한, 더 가독성이 좋은 코드를 작성하는데 도움이 된다고 생각됩니다. `const` 단언문을 type으로 다루기 위해선 typeof를 사용해야하고 여러 파일에서 타입으로 다룰경우 중복 코드를 제거하기 위해서 다음과 같은 보일러플레이트를 작성해야 합니다.

```ts
const DIRECTION = {
  Up: "up",
} as const;

// 🤔
export type Direction = typeof Direction;

// 🤔
export type DirectionValue = (typeof Direction)[keyof typeof Direction];
```

### 정리 및 개인적인 의견

`enum`은 js가 정체되었던 당시에 ts가 js에 추가한 기능이고 타입과 값 모두 다룰수 있습니다. 추후 ts에 `const` 단언문 기능이 추가된 이후로 둘은 비교의 대상이며 대부분의 경우 동일한 목적으로 사용이 가능하고 타입으로 다룰때 차이가 발생합니다. `const` 단언문의 경우 할당문 뒤에 ts 코드를 추가해 상수로 만들수 있고, 타입으로서 다루기 위해선 typeof를 사용해야하는 반면 `enum`은 그 자체로 타입이므로 별도의 변환이 필요 없습니다. `enum`은 현재의 ts의 발전방향과는 맞지 않는 코드이며 런타임에 영향을 끼치는 코드이지만, 타입으로 사용할 때 간결하다고 좀 더 가독성이 좋다는 장점이 있습니다. 반면에 `const` 단언문은 트랜스파일시 사라져 런타임에 영항을 미치지 않으며, ts 환경에서 타입이 필요할 때 추가 구문으로 값을 타입으로서 다룰 수 있다는 장점이 있습니다. 개인적으로는 현재의 ts발전 방향과는 맞지 않더라도 ts에서 제공하는 기능을 거부할 필요는 없이 타입을 다룰때 간결하고 가독성이 좋은 `enum`을 쓰는것은 여전히 효용성이 있다고 판단됩니다.
