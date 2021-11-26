[![Netlify Status](https://api.netlify.com/api/v1/badges/1723e51f-2245-4975-8e23-a2fe14067921/deploy-status)](https://app.netlify.com/sites/polyomino-puzzle/deploys)

# <image src="./readme-assets/favicon.png" width="35px" title="favicon" alt="polyomino"> Polyomino-Puzzle

주어진 게임 보드에 폴리오미노 도형을 적절히 채워 나가는 퍼즐 형식의 웹 게임입니다.

그런데 3D를 곁들인..!

- Live: <https://polyomino-puzzle.com>

- 해당 게임은 최신 버전의 Chrome, Firefox, Safari에서 지원하고 있습니다.

- 폴리오미노란 크기가 같은 정사각형들을 변이 맞닿게 붙여 하나로 이어 만든 평면 도형을 뜻합니다.

  <image src="./readme-assets/polyomino.png" width="250px" height="150px" title="폴리오미노 이미지" alt="폴리오미노 이미지"/>

# 📍Contents

- [Usage](#usage)
- [Motivation](#motivation)
- [Schedule](#schedule)
- [Tech Stack](#tech-stack)
- [Challenges](#challenges)
- [Feature](#feature)

# 🎮 Usage

```
git clone https://github.com/chlghks/polyomino-puzzle.git
cd polyomino-puzzle
npm install
npm run start
```

# 💡Motivation

다양한 기능보다는 하나의 확실한 컨셉을 중심으로 프로젝트를 진행하고 싶었습니다.

<p align="center">
<image src="./readme-assets/cube.gif" />
<br/>3D! 멋지지 않나요?
</p>

3차원이라는 입체적인 공간을 이용해서 무엇인가를 만들어 내는 것 자체에 큰 매력을 느꼈고,  
테트리스와 퍼즐 블럭 맞추기 놀이에서 아이디어를 얻어 3D 폴리오미노 퍼즐 게임을 기획하게 되었습니다.

# 📆 Schedule

### 기획 및 구상 [ 09. 27. ~ 10. 01. ]

- 기술스택 검토
- [태스크 카드 작성](https://melon-dresser-15e.notion.site/a026bdda54a54a8894d5a8e70b606488?v=09fb8d07f35d4d4eb182e68f500217a4)
- [Mock up](https://www.figma.com/file/dfAIi0VLO0VdZB6ulAIQYs?embed_host=notion&kind=&node-id=0%3A1&viewer=1)

### 개발 [ 10. 04. ~ 15. ]

- 게임 기능 구현
- Netlify 배포

# 🛠 Tech Stack

- ES6+
- React
- Three.js
- React-Three-Fiber
- React-Three/Drei
- Prop-Types
- Styled-Components
- Zustand

### Why React?

반복해서 만들어지는 블럭들과 Three.js 렌더링을 위한 구성 요소(scene, light, camera, audio)들을 React의 Component로 분리해서 관리함으로써 코드 재사용성과 가독성을 향상시키고자 했습니다.

# 🔥 Challenges

### # 3D


처음 프로젝트를 기획할 때는, 2D에서 벗어나 3D로 생각하는 것이 익숙하지 않았습니다.  
그래서 게임을 플레이하는 페이지만 \<canvas>로 구현하고, 그 외 게임 일시정지, 랭킹 확인 등의 나머지 페이지들은 \<button> 등의 Element로 구현하는 것을 목표로 시작했습니다.

<p align="center">
<image src="./readme-assets/pausePage.png" width="300px" />
<image src="./readme-assets/rankingPage.png" width="300px" />
</p>

하지만 프로젝트를 진행하면서 3D를 다루는 것에 익숙해지니 페이지로 나눠야 할 요소들을 각각 다른 좌표에 위치시키고 카메라를 컨트롤해서 장면이 전환되는 듯한 효과로 구현하는 아이디어가 떠올랐습니다.

<p align="center"><image src="readme-assets/scene.gif" /></p>

이후 해당 아이디어를 기반으로 모든 요소를 \<canvas> 내에서 3D 요소로 구현하였고, 이 경험을 통해 작은 생각의 전환이 프로젝트의 전체적인 흐름을 바꿀 수 있다는 사실을 배웠습니다.

### # 퍼즐 블럭 컨테이너

<p align="center">
<image src="./readme-assets/MockUpPlay.png" height="300px" />
<image src="./readme-assets/carousel.gif" height="300px" />
</p>

처음 Mockup으로 구상할 때는 게임 앱과 같은 느낌을 주기 위해 Carousel 방식을 생각했습니다.  
막상 Carousel 방식으로 구현해 보니 생성된 블럭이 한 눈에 보이지 않아 사용자 입장에서 불편함을 느낄 것 같다는 생각이 들었습니다.

<p align="center">
<image src="./readme-assets/dial.png" width="240px"/>
<image src="./readme-assets/dial.gif" />
</p>

다이얼을 돌리는 방식에서 아이디어를 얻어, 퍼즐 블럭들이 다이얼을 돌리는 것처럼 회전되게 하여 2D 같은 느낌과 블럭이 한 눈에 보이지 않았던 문제를 해결할 수 있었습니다.

### # 퍼즐 블럭 랜덤 생성 알고리즘

게임 플레이에 사용되는 블럭들은 스테이지별로 고정된 종류의 블럭을 방향만 무작위로 바꿔주며 생성했습니다.  
하지만 계속해서 같은 종류의 블럭이 생성되면 일정한 패턴이 반복되어 사용자 입장에서 지루함을 느낄 수도 있겠다는 생각이 들었고, 이를 해결하기 위해 각 스테이지가 시작될 때마다 퍼즐 블럭 자체를 무작위로 생성하여 불규칙성을 추가했습니다.

게임 보드의 좌표(셀) 정보가 담긴 2차원 배열을 DFS 방식으로 순회하면서 현재 선택된 셀을 중심으로 인접한 셀 중 하나를 무작위로 선택하는 과정을 반복하여 랜덤 블럭을 만들어내는 알고리즘을 구현했습니다.  
인접한 셀을 무작위로 선택하는 과정에서 고립될 가능성이 있는 셀을 우선으로 선택되게 하여 1개의 셀로 이루어진 블럭이 생기는 예외 케이스를 방지했습니다.

### # Frame Drop

게임의 기본적인 요소들을 모두 구현하고 나서 Netlify로 배포하자 렌더링 속도가 느려지고 버벅거리는 현상이 확인되었습니다.  
로컬 환경에서는 60FPS으로 유지되던 값이 배포 이후에 25FPS까지 떨어지는 Frame Drop이 발생했습니다.  

크롬 개발자 도구의 프로파일링 기능을 이용해서 확인해 본 결과, 특정 Hook(useFrame)이 실행되는 데 걸리는 시간이 로컬에서는 0.92ms, 배포 후에는 10.96ms로 약 10배 이상의 차이가 있었습니다.

| <image src="./readme-assets/localProfiling.png"/> | <image src="./readme-assets/deployProfiling.png" /> |
|:---:|:---:|
| 로컬 환경 프로파일링 결과 | 배포 후 프로파일링 결과 |

리서치 결과, 호환성 목적으로 시장 점유율이 0.2% 이상인 모든 브라우저들을 지원하기 위해 너무 많은 번들이 생성되고 있었고, 이것이 빌드된 이후 Frame Drop을 발생시키는 원인임을 확인했습니다.

이후 Chrome, Safari, Firefox의 최신 브라우저만 지원하도록 수정하여 해당 문제를 해결했습니다.
또한, 문제를 일으키던 Hook이 3D 텍스트를 정렬시키는 데 과도한 렌더링을 일으키고 있다는 것을 확인했고, 해당 Hook 없이 정렬되도록 리팩토링하여 최적화했습니다.

# Feature

<p align="center"><image src="./readme-assets/gamePlay.gif"/></p>

- 게임이 시작되면 게임 보드와 퍼즐 블럭이 생성됩니다.
- 게임 보드를 회전시킬 수 있습니다.
- 퍼즐 블럭 컨테이너를 회전시킬 수 있습니다.
- Drag and Drop 방식으로 게임 보드에 퍼즐 블럭을 놓을 수 있습니다.
- 게임 보드에 놓은 퍼즐 블럭을 클릭하면 게임 보드에서 제거할 수 있습니다.
- 주어진 퍼즐 블럭으로 게임 보드를 채우면 다음 스테이지로 넘어갑니다.

<p align="center"><image src="./readme-assets/gameEnd.gif"/></p>

- 주어진 시간 안에 게임 보드를 채우지 못 하면 게임이 종료됩니다.
- 게임이 종료되면 점수를 확인할 수 있고 랭킹 등록을 할 수 있습니다.
