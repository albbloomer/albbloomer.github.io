---
template: "post"
title: "Builder Pattern - @Builder error : Final, @Builder.default (초기화, @Builder will ignore the initializing expression entirely) "
cover: "../images/스크린샷 2023-11-18 오후 7.43.35.png"
description: "this is a description"
date: "2022-01-03T22:31:00Z"
slug: "solid_20220501"
keywords: "pig"
categories:
- spring

tags:
- spring
- java
---

회사에서 금융 프로젝트를 하면서 Jenkins를 통해 빌드를 할 때 간헐적으로 에러가 발생했다. 즉슨, 어쩔때는 빌드가 성공하여 배포도 잘되었다는 것.

찾아보니 @Builder 어노테이션을 썼을 때 필드를 초기화하면 에러가 날수도 있단다. **@Builder will ignore the initializing expression entirely** version 이 올라감에 따라 이제는 필수로 써야한다고는 하는데.. 이게 오락가락 한가보다.

요즘 커뮤니케이션을 하면서 **두괄식**이 굉장히 중요하다고 느끼고 있다. 결론만 우선 말하면 된다. 부가적인 설명은 필요없다. 나는 우선 해결 방법을 먼저 말하고 공부한 내용을 뒤에 쓰려한다.


> <strong>해결 방법</strong>
**1.** fianl 키워드 붙이기
**2.** @Builder.default 붙이기

<img src="https://images.velog.io/images/minyul/post/ce349f71-4025-4e9c-81e4-b8dc8ef73211/image.png" width="100%"  alt=""/>

<img src="https://images.velog.io/images/minyul/post/5fd1fc2c-795c-48dd-b4b2-5741dd0467ed/image.png" width="100%"  alt=""/>

> <strong>부연 설명</strong>

때마침 나는 학교 동기들과 **백기선님의 디자인패턴**을 공부하고 있었고 빌더패턴을 공부했기 때문에 빌더패턴을 우선 구현해보고자 한다. 되게 간단한 구현이기에 간단히 실시간 코딩과 캡처로 구현을 끝내려한다. 그리고 이 구현 연습으로 @Builder 어노테이션을 쓸 때, 잔상이라도 이 구현이 머리에 남아있으면 된다.

<img src="https://images.velog.io/images/minyul/post/52137551-2ed3-4f7e-90c1-a8bab1c669b2/image.png" width="100%"  alt=""/>

<img src="https://images.velog.io/images/minyul/post/3fec6c39-dc6a-41a9-ab19-98168589878b/image.png" width="100%"  alt=""/>

<img src="https://images.velog.io/images/minyul/post/5b92db59-81dd-4b82-9693-605dd633cdf5/image.png" width="100%"  alt=""/>

<img src="https://images.velog.io/images/minyul/post/817cb122-257c-4c07-8947-f11aa5b36391/image.png" width="100%"  alt=""/>


<strong>Builder 를 사용하면 우리가 생각하는 방법으로는 초기화가 되지 않는다.</strong>

<img src="https://images.velog.io/images/minyul/post/ef8bc43f-030c-42a8-95f1-bc530a54a6b2/image.png" width="100%"  alt=""/>

<img src="https://images.velog.io/images/minyul/post/0fb07be4-1c94-41bf-9a50-8afb13257492/image.png" width="100%"  alt=""/>

> <strong>자, 그냥 내가 만약 builder build method에 초기화를 시켰다면 ? null 이 아닌 값이 잘 나올 것이다. 그럼 왜? 이유가 뭐지? Docs 를 보자. 기본적으로 0, null, false 가 나오게 구현이 되어있다. </strong>

<img src="https://images.velog.io/images/minyul/post/81f5d9a7-93d2-4dc4-826e-0fa02cecd3be/image.png" width="100%"  alt=""/>


