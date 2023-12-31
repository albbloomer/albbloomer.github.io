---
template: "post"
title: "Cluster Index vs Non-Cluster Index 이론 및 성능 비교 ( JPA + MYSQL )"
cover: "../images/스크린샷 2023-11-16 오후 2.22.58.png"
description: "this is a description"
date: "2021-06-28T20:31:00Z"
slug: "clusterindex_20210629"
keywords: "pig"
categories: 
    - db
tags:
    - mysql
    - db
---

## 시작

나는 항상 Auto-Increment를 이용해서 PK를 넣었다. 하지만 이번에 통계 프로젝트를 하면서 Auto_Increment가 아닌 PK에 Time, name을 PK로 설정을 했다. 그 이유는 명료하다. Auto_Increment 로 PK를 설정하는 것보다 Cluster Index로 설정을 하는 것이 성능에 좋다는 것을. 물론 무조건 장점만 있다면 무엇이든 Cluster Index로 설정을 하겠지만 여러가지 경우의 수를 생각해야하며 Auto_Increment가 아닌 유동적인 Column을 이용한 PK로 설정하면 나중 생각지도 못한 경우로 DB 스키마 자체를 뜯어내야하기 때문에 좀 더 신경써서 설정을 해야한다. 간단하게 설명하고 싶다. 이해하기 어려웠기에.

## Non Cluster Index
Non Cluster Index는 우리가 흔히 쓰는 인덱스다. 보통은 Auto-Increment로 PK를 설정하고 데이터를 찾고자 할 때, 빨리 찾기 위해 정렬을 위한 Index를 설정 하는 것이 Non Cluster Index이다. 이 인덱스는 여러개 생성을 할 수 있다.

생각해보자. 우리는 인덱스가 무엇인지 알고 있다. 흔히 설명하는 색인 또는 찾아보기목록. 그렇다. 우리가 책을 읽고 맨 앞 그리고 맨 뒤에 <strong>찾아보기</strong> 이게 바로 Non Cluster Index다. 우리가 매일 말하는 인덱스는 어떻게보면 항상 자연스럽게 Non Cluster Index를 얘기하고 있는 것.

<img src="https://images.velog.io/images/ggomjae/post/418b68ec-88e6-40e0-840b-8dd208d805d9/image.png" width="100%"  alt=""/>

그림을 보면 이해하기가 쉽다. 현재 8을 찾고자한다. Index가 있다는 것은 무조건 그 기준으로 정렬이 되있다는 뜻이다. 즉, 인덱스 테이블이 여러개 있다. 그림을 보면 그 중간이 임시 테이블이며 인덱스 테이블이다. 인덱스 테이블을 보면 그 값이 있는 것이 아니라 또 <strong>3페이지 -2</strong> 라는 주소값을 갖게 된다. 그리고 그 주소값을 향해 찾아가면 데이터가 있다. 현재 중간에 있는 것이 Leaf 인덱스다. 그리고 그 Leaf 인덱스 값에는 그 데이터 값 자체가 있는 것이 아닌 데이터가 있는 주소값을 갖고있다.

현재 Dept 이 1밖에 안되서 그렇지 좀 더 Dept이 있다고 가정해보면 이 왼쪽에서 오른쪽으로 가는 과정들이 각 각의 값들이 주소값이며 이것을 수직적 탐색이라고 한다.

<img src="https://images.velog.io/images/ggomjae/post/4e29caab-13b6-4a20-8125-3b4d0277bad5/image.png" width="100%"  alt=""/>

친절한 SQL에 있는 하나의 예시다. 오른쪽 그림을 보면 인덱스라는 dept에 수직적으로 스캔을 하고 마지막으로 수평 스캔을 한다음 각 ROWID를 얻고 데이터 테이블에 랜덤엑세스를 한다.

책의 내용에 이런 문장이 있다. <strong>수평적인 스캔을 하는 이유 ?</strong>
- 첫째, 조건절을 만족하는 데이터를 모두 찾기 위해
- 둘째, ROWID를 얻기 위해

이 ROWID란, 데이터가 있는 테이블에 주소값이라고 생각하면 된다.
이게 바로 우리가 매일 사용하고 있는 인덱스며 Non Cluster Index 이다.

## Cluster Index
Non Cluster Index를 이해했으면 쉽게 Cluster Index를 이해할 수 있을 것이다. 그 이유는
테이블 자체가 클러스터드 인덱스의 리프 노드(leaf node)로서 기능하기 때문에 쉽다. 즉, Non Cluster Index의 leaf node는 이 데이터를 찾기 위해 ROWID를 갖고 데이터를 찾아야했다.
하지만 Cluster Index는 이 leaf node에 데이터 값이 있기 때문에 시간이 절약되며 훨씬 빠르게 찾을 수 있다는 것이 장점이다.

물론 단점도 있다. Insert Data 를 할 때 단점이 있다. 이유는 Non Cluster Index처럼 따로 인덱스를 관리하는 것이 아닌 Cluster Index는 물리적인 즉, 그 자체로 정렬을 하기 때문에 Insert Data를 할 때, 정렬에 맞게 끔 insert를 해야하므로 이부분에서는 Non Cluster Index보다 성능이 좋지 않다.

그럼 여기서 결론을 내릴 수 있다. Cluster Index는 insert Data 보다는 Read를 하는 프로젝트일 때 좋은 선택지다. 예를 들자면 Batch Module로 통계에 대한 값들을 주기적으로 DB에 넣고 API Module로 그 값들을 읽어 드리는 프로젝트 일 경우는 적합하다.


## 직접 확인하기 Cluster Index vs Non Cluster Index - 1 JPA에 대한 구현

<img src="https://images.velog.io/images/ggomjae/post/ede1d587-3185-471e-9d48-d016bb23e173/image.png" width="100%"  alt=""/>

NonClusterIndex 같은 경우에는 보통 우리가 했던 GenerationType.IDENTITY를 이용하여 구현하였고 ClusterIndex 같은 경우에는 @EmbeddedId를 이용하여 구현하였다.[AUTO를 쓰지 않은 이유](https://albbloomer.github.io/generationtype20210404/)

## 직접 확인하기 Cluster Index vs Non Cluster Index - 2 10만개 더미데이터를 이용한 성능 확인

<img src="https://images.velog.io/images/ggomjae/post/0fb9db4d-5411-4410-b256-834e170aae6a/image.png" width="100%" alt="" />

각 차이점은 cluster_index_entity는 pk 즉, cluster index를 이용하여 값을 구하고 non_clusterindex_entity는 non cluster index를 이용하여 값을 구한다는 것이다.
그리고 결과적으로 Query Cost에 대한 차이가 있다.

## Index에 대한 우리가 가져가야할 생각
친절한 SQL책을 읽어보면서 좋은 표현이라고 해야하나.. 좋은 문장이 많다.

- 인덱스를 정상적으로 사용한다
  인덱스를 정상적으로 사용한다는 것은 <strong>리프 블록에서 스캔 시작점을 찾아 거기서부터 스캔을 하다가 중간에 멈추는 것</strong> 이라고 한다. 즉, 나의 생각은 수직적인 스캔을 하고 ROWID를 찾는 과정 또는 데이터를 찾는 과정에서 적절하게 범위를 조절하는 것이 인덱스를 제대로, 정상적으로 사용한다고 하는 말 같다. 만약, 이 적절한 범위를 찾지 못하거나 인덱스를 잘못걸어준다면 우리가 가장 꺼려하는 (물론 손익분기점에 따른 예외도 있지만) Index FullScan방식으로 작동을 하게 된다.

- 인덱스를 사용하는 이유는 <strong>정렬</strong>이다.
- 인덱스 스캔을 하는 이유는 <strong> 소량의 데이터를 빨리 찾고 ROWID를 얻기 위해</strong>
- 수직적 탐색은 <strong>인덱스 스캔 시작지점을 찾는 과정</strong>
  수평적 탐색은 <strong>데이터를 찾는 과정</strong>

- Table Full Scan은 시퀀셜 액세스인 반면, 인덱스 ROWID를 이용한 테이블 액세스는 랜덤 액세스
- Table Full Scan은 Multiblock I/O인 반면, 인덱스 ROWID를 이용한 테이블 액세스는 Single Block I/O


- 인덱스 손익분기점 이 그래프의 5% ~ 20%는 10만에서 100만건정도의 수치고 1000만건 등의 큰 수치일 수록 이 손익분기점은 내려간다.

<img src="https://images.velog.io/images/ggomjae/post/578ed161-bc43-45b0-9577-bbefd30c2345/image.png" width="100%" alt=""/>


## 끝내며
나는 이번 신입 사원 프로젝트로 후후 통계 프로젝트를 했다. Spring Batch를 이용하여 통계낸 것을 Api Module에서 통계값을 가져와 통계 그래프와 결과를 보여주는 프로젝트다. 이러한 프로젝트를 통해서 Non Cluster Index, Cluster Index를 알았고 그 과정속에서 Index에 대한 깊이를 조금은 들어왔다고 생각한다. 굉장히 배울점이 많아서 좋았던 프로젝트였고 더 나아가 Group By에 대한 이슈가 있었으므로 그 부분또한 추후에 포스팅을 할 예정이다.

2021-05-11 : 커버링 vs 클러스터 차이 추가
<img src="https://images.velog.io/images/ggomjae/post/7f4a834f-689f-4cdd-be10-9b563d130503/image.png" width="100%"  alt=""/>


