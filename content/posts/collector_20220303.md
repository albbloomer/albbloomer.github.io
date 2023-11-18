## 시작
<strong>모던 자바 인액션 '6장'</strong> 을 읽고 Collect, Collector, Collectors 에 대해서 정리봤다. 

## 알아야하는 정의
<strong>Collect</strong> : Collector를 매개변수로 하는 스트림의 최종 연산 <br>
<strong>Collector</strong> : Collect에서 필요한 메서드를 정의해놓은 인터페이스 <br>
<strong>Collectors</strong> : 다양한 기능의 Collector를 구현한 클래스 제공 <br>

Collect는 최종연산이며 스트림의 요소를 소비해서 최종 결과를 도출한다.

## Collect, Collectors, Collector 구조
<img src="https://images.velog.io/images/ggomjae/post/813c5d48-4f6b-4399-9672-7476d676be8f/image.png" width="100%"  alt=""/>
<img src="https://images.velog.io/images/ggomjae/post/db5aea27-710f-455e-8df2-8e2f49e7c285/image.png" width="100%"  alt=""/>
<img src="https://images.velog.io/images/ggomjae/post/6e163298-4658-4981-8a11-7853acbdc981/image.png" width="100%"  alt=""/>

이러한 구조를 알면, Collector 인터페이스에 정의된 메서드를 구현해서 커스텀 컬렉터를 개발할 수있다는 장점이있음.
## 왜 우리는 Collector를 공부해야 하는가?
```java
Map<Currency, List<Transaction>> transactionByCurrencies = new HashMap<>(); 
  for (Transaction transaction : transactions) { 
    Currency currency = transaction.getCurrency(); 
    List<Transaction> transactionsForCurrency = transactionsByCurrencies.get(currency); 
    if(transactionsForCurrency == null) { 
       transactionsForCurrency = new ArrayList<>(); 
       transactionByCurrencies.put(currency, transactionsForCurrency); 
     } 
     transactionsForCurrency.add(transaction); 
}
```
<strong>Collector</strong>를 쓰지 않고 쌩 코드.
```java
Map<Currency, List<Transaction>> transactionsByCurrencies = 
  transactions.stream().collect(groupingBy(Transaction::getCurrency));
```
<strong>Collector</strong>를 쓰고 간결하고 명료하게. 함수형프로그래밍에서는 <strong>무엇</strong>을 원하는지 직접 명시할 수 있어서 어떤 방법으로 이를 얻을 수 있는지는 신경 쓸 필요가없다.
즉, Collector 인터페이스 구현은 스트림의 요소를 어떤 식으로 도출할지 지정한다.
또한, Collect로 결과를 수집하는 과정을 간단하면서도 유연한 방식으로 정의할 수 있다는 점이 최대 강점.

## Collectors.메서드
<img src="https://images.velog.io/images/ggomjae/post/5ff201c0-3b2c-4f6e-8488-35a2c75e2421/image.png" width="100%"  alt=""/>

### 스트림 요소를 하나의 값으로 리듀스하고 요약
<img src="https://images.velog.io/images/ggomjae/post/1d0f5b03-cac1-4c48-a4c5-65a5bcbb8e3e/image.png" width="100%"  alt=""/>

스트림에 있는 객체의 숫자 필드의 <strong>합계</strong>, <strong>평균</strong> 등을 반환하는 연산
```java
int totalCalories = menu.stream().collect(summingInt(Dish::getCalories));
```
<img src="https://images.velog.io/images/ggomjae/post/881d692e-3ae8-487c-83dc-759c3aa9ab1f/image.png" width="100%"  alt=""/>

### 요소 그룹화
```java
Map<Dish.Type, List<Dish>> dishesByType = 
          menu.stream().collect(groupingBy(Dish::getType));

// 결과드아.
{ FISH = [prawns, salmon], OTHER = [french fries, rice, season fruit, pizza],
  MEAT = [pork, beef, chicken]}
```
<img src="https://images.velog.io/images/ggomjae/post/1c5de941-6b6b-489d-a272-9236354e531c/image.png" width="100%"  alt=""/>
<img src="https://images.velog.io/images/ggomjae/post/67f0c60b-1217-42f0-8842-8cbca62a98a6/image.png" width="100%"  alt=""/>

```java
return groupingBy(callsifier, HashMap::new, downstream)
```
으로 들어가 좀 더 깊숙히 들어갈 수 있으나 나는 여기서 멈춘다. <strong>classifier</strong>를 통해서 요소에 대한 키값을 매핑하고 <strong>downstream</strong>을 이용하여 GroupBy 다음 그다음 컬렉션인 <strong>toList</strong>로  !!! ![](https://images.velog.io/images/ggomjae/post/14034d94-89f4-4b61-931f-6bf13d702c5e/image.png)
그룹화 같은 경우 <strong>여러가지 조합</strong>을 효과적으로 할 수 있다는 것이 장점이다.
예를 들면,
```java
Map<Dish.Type, Integer> totalCaloriesByType = 
      menu.stream().collect(groupingBy(Dish::getType,
            summingInt(Dish::getCalories)));
```
각 타입별로 칼로리 합계를 통계내는 코드이다.

### 요소 분할

분할은 <strong>분할 함수</strong>라 불리는 ```프레디케이스```를 분류 함수로 사용하는 특수한 그룹화 기능.
```java
Map<Boolean, List<Dish>> partitionedMenu = 
          menu.stream().collect(partitioningBy(Dish::isVegetarian));

// 결과드아.          
{false = [pork, beef, chicken, prawns, salmon],
 true = [french fries, rice, season fruit, pizza]}
```
<img src="https://images.velog.io/images/ggomjae/post/e3beb727-4a26-4116-aef1-03e309544076/image.png" width="100%"  alt=""/>
분할 함수가 반환하는 <strong>참, 거짓 두 가지 요소의 스트림 리스트를 모두 유지한다는 것</strong>이 분할의 장점


## Collector 인터페이스

Collector 인터페이스는 리듀싱 연산을 어떻게 구현할지 제공하는 메서드 집합으로 구성된다.
<strong>Collector의 생성자 부분</strong>
<img src="https://images.velog.io/images/ggomjae/post/c9534556-2f3d-483f-9396-83be8dc39e58/image.png" width="100%"  alt=""/>
```
public interface Collector<T, A, R> { 
	Supplier<A> supplier(); 
	BiConsumer<A, T> accumulator(); 
	Function<A, R> finisher(); 
	BinaryOperator<A> Combiner(); 
	Set<Characteristics> characteristics(); 
}
```
>T : 수집될 스트림 항목의 제네릭 형식
A : 누적자, 즉 수집 과정에서 중간 결과를 누적하는 객체의 형식
R : 수집 연산 결과 객체의 형식 [ 대다수가 컬렌션 ]

### supplier : 새로운 결과 컨테이너 만들기
```java
public Supplier<List<T>> supplier() {
 	return () -> new ArrayList<T>;
}
```
### accumlator : 결과 컨테이너에 요소 추가하기
리듀싱 연산을 수행하는 함수를 반환한다. 각 요소를 처리하는 계산 로직. 각 요소가 올 때마다 중간 결과를 생성하는 로직
```java
public BiConsumer(List<T>, T> accumulator() {
	return (list, time) -> list.add(item);
}

```

### finisher : 최종 변환값을 결과 컨테이너로 적용
스트림 탐색을 끝내고 누적자 객체를 최종 결과로 반환하면서 누적 과정을 끝낼 때 호출할 함수를 반환해야한다.
```java
public Function<List<T>, List<T>> finisher() {
	return Function.identity();
}
```
<img src="https://images.velog.io/images/ggomjae/post/730ccbe2-2efd-4f40-9a64-37b52b80c299/image.png" width="100%"  alt=""/>

### combiner : 두 결과 컨테이너 병합
스트림의 서로 다른 서브파트를 병렬로 처리할 때 누적자가 이 결과를 어떻게 처리할 지 정의한다. 즉, combiner의 역할을 identity[초기값]와 accumulator[중간 로직]를 가지고 여러스레드에서 나눠 계산할 결과를 합치는 역할
```java
public BinaryOperator<List<T>> combiner() {
	return (list1, list2) -> {
    	list1.addAll(list2);
        return list1;
    }
}
```
<img src="https://images.velog.io/images/ggomjae/post/3d4ac634-a8d8-4da6-8dfd-7798d0b5242b/image.png" width="100%"  alt=""/>
<img src="https://images.velog.io/images/ggomjae/post/1e9480d9-7d60-4457-b345-502d6b246dea/image.png" width="100%"  alt=""/>

### charateristics
컬렉터의 연산을 정의하는 Charateristices 형식의 불변 집합을 반환한다.
```java
public Set<Characteristics> charateristics() {
	return Collections.unmodifiableSet(EnumSet.of(
    	IDENTITY_FINISH, CONCURRENT));
}
```
<img src="https://images.velog.io/images/ggomjae/post/6e663faf-2f55-4972-a811-4bbb8e637a2e/image.png" width="100%"  alt=""/>

## 컬렉터 성능 비교
[A_L_B_Bloomer_GITHUB](https://github.com/albbloomer)


## Collect vs Reduce
<img src="https://images.velog.io/images/ggomjae/post/a633307a-bb19-41a3-bc17-745b6537291f/image.png" width="100%"  alt=""/>
<img src="https://images.velog.io/images/ggomjae/post/63fde077-20da-4b96-b00e-a66d42f26e56/image.png" width="100%"  alt=""/>

## Collectors의 정적 팩토리 메소드
<img src="https://images.velog.io/images/ggomjae/post/78b721be-033a-4a87-9370-cdee8356dfbf/image.png" width="100%"  alt=""/>
GoF 디자인 패턴 중 팩토리 패턴에서 유래한 이 단어는 객체를 생성하는 역할을 분리하겠다는 목적이 있다. <strong>"생성자 대신 정적 팩토리 메서드를 고려하라"</strong>

- 이름을 가질 수 있다.
- 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다.
- 반환 타입의 하위타입 객체를 반환할 수 있는 능력이 있다.
- 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.
- 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.


### 정적 팩토리 메소드로
```java
public class Person{
    private int age;
    private Person(int age){
        this.age = age;
    }
    
    public static Person ofAge(int age){
        return new Person(age);
    }
}
```