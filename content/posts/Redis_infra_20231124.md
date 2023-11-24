---
template: "post"
title: "redis 구성 - 단일, 레플리케이션, 센티넬"
cover: "../images/infra/클러스터.png"
description: "this is a description"
date: "2023-05-23T22:31:00Z"
slug: "cache_local_global_20230523"
keywords: "pig"
categories:
- redis

tags:
- infra
- cache
---

## 시작

레디스 구성에 대해서 글을 쓰려고 한다. 항상 어렴풋이 실무에서 인프라팀과 소통을 할 때 들었던 키워드들로 잠깐 공부하고 실무 커뮤니케이션을 했다. 
이번에는 잠시 쉬는 동안 운영하고 있는 인베스팅뷰, 줌투자에 붙어있는 레디스를 공부하면서 전체적으로 여러 종류의 구성을 조사하고 공부해보려고 한다.

- 2023년 11월 24일 글 쓰다 말았음.

<img src="../images/infra/단일레디스.png" style="display: block; margin: auto; width: 70%;" alt=""/>
<img src="../images/infra/레플리케이션.png" style="display: block; margin: auto; width: 70%;" alt=""/>
<img src="../images/infra/클러스터.png" style="display: block; margin: auto; width: 70%;" alt=""/>
<img src="../images/infra/센티널.png" style="display: block; margin: auto; width: 70%;" alt=""/>


## 끝내며