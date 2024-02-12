---
title: "nvm use 자동화"
date: "2024-02-09 22:00:00"
description: "바퀴 재발명"
thumbnail: /thumbnails/hello-world.jpg
slug: "test3"
keyword: "nvm, vscode, node, terminal"
---

node버전 관리를 위해서 NVM(Node Version Manager)을 많이들 사용하고 계실겁니다. 또한 협업시 공통된 node 버전을 사용하기 위해 프로젝트에 `.nvmrc` 파일로 버전을 관리하기도 합니다.

하지만 `.nvmrc` 파일만으론 자동으로 프로젝트의 `node` 버전을 맞춰주지 않습니다. 터미널에 `nvm use` 명령어를 작성해야 `.nvmrc`에 작성된 `node` 버전을 사용할 수 있습니다.

그렇다면 터미널을 열 때 자동으로 `.nvmrc`에 있는 `node` 버전을 맞춰준다면 편리할 것 같습니다.

이미 구현되어 있는 `vscode extension`이 있습니다. 실제 사용은 extension을 사용 하되, 어떤 컨셉으로 구현할 수 있을지 살펴보겠습니다.

## 목차

- 익스텐션으로 `nvm use` 사용하기
- 직접 구현해보기
- 결론

## 익스텐션으로 `nvm use` 사용하기

터미널을 열 때 자동으로 `nvm use`를 입력해주는 `vscode extension`이 있습니다. [vsc-nvm](https://marketplace.visualstudio.com/items?itemName=henrynguyen5-vsc.vsc-nvm)을 다운받아 실행하면 터미널을 열 때 nvm use 명령어를 실행시켜 줍니다. (아쉽게도 [해당 프로젝트](https://github.com/HenryNguyen5/vsc-nvm)는 더이상 업데이트 계획이 없는것 같습니다.)

![env](/assets/blog/using_extension.gif)

## 직접 구현해보기

호기심이 생겼습니다. 의도적으로 `바퀴의 재발명`을 해보겠습니다.

실행 환경은 다음과 같습니다.
(사용하는 IDE, shell이 다르더라도 컨셉은 같다고 생각합니다.)

> mac, vscode, zsh

단계는 세 단계로 진행 됩니다.

1. zsh 설정하기
2. vscode 설정하기
3. 확인하기

#### zsh 설정하기

zsh 셸에서 특정 환경변수가 있을경우 해당 명령어를 실행시킬 수 있도록 합니다.

터미널에 `vi ~/.zshrc`를 입력하여 다음 명령어를 작성해주세요.

```vim
# 입력해야할 코드
if [[ -n $ZSH_INIT_COMMAND ]]; then
  echo "Running: $ZSH_INIT_COMMAND"
  eval "$ZSH_INIT_COMMAND"
fi
```

설명은 다음과 같습니다.

```vim
# 설명
if (변수($) ZSH_INIT_COMMAND의 길이가 0이 아니면(-n:non-zero) )
  터미널에 "Running: $ZSH_INIT_COMMAND" 출력
  명령어 실행 "$ZSH_INIT_COMMAND"
if문 종료
```

#### vscode 설정하기

이제 vscode에서 터미널을 열 때 위에서 설정했던 환경변수 `ZSH_INIT_COMMAND`에 실행시킬 명령어를 주입해보겠습니다.

vscode에서 `cmd + shift + p`를 눌러 `Open Workspace Setting(JSON)`으로 들어가 주세요.

각자의 운영체제에 맞게 `env.` 뒤 텍스트를 수정해주세요. (ex. mac의 경우 osx)

![env](/assets/blog/env.png)

```js
{
  ...others,

  "terminal.integrated.env.osx": {
    "ZSH_INIT_COMMAND": "nvm use"
  }
}
```

#### 확인하기

그럼 이제 터미널을 실행해볼까요?

![env](/assets/blog/direct_implementation.gif)

## 결론

- 터미널을 열 때마다 작성해야하는 번거로운 `nvm use` 명령어를 자동화 하고 싶었습니다. 익스텐션을 사용하되, 의도적으로 바퀴의 재발명을 해보았습니다.

## ref

- <https://stackoverflow.com/a/60438516/21322780>
