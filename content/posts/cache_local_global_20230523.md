---
template: "post"
title: "[1] 서비스 캐싱 - Local, Global"
cover: "../images/spring/스크린샷 2023-11-22 오후 6.53.58.png"
description: "this is a description"
date: "2023-05-23T22:31:00Z"
slug: "cache_local_global_20230523"
keywords: "pig"
categories:
- spring

tags:
- spring
- java
- cache
---

줌인터넷을 다니면서 여러 서비스를 오픈했다. 서빙하는 과정에서 캐싱은 중요하다. 클라이언트 개발자에게도 좋은 퍼포먼스를 내기위해 중요하며 서비스를 사용하는 사용자에게도 어플리케이션의 좋은 성능을 경험시켜주기 위해 서빙 속도는 중요하다. 줌투자(PC)와 인베스팅뷰(APP) 은 금융에 대한 서비스다. 캐싱에 대한 처리는 당연히 했으며 해당 부분을 포스팅하려고 한다.

## 가보자고 - 로컬 캐시

Local 하게 캐싱을 해야할 때,

정답은 없다. 하지만 보편적으로 지역적으로 캐싱을 해야할 때는 동기화에 문제가 없는 경우에 로컬 캐싱을 한다. 예를 들어, 내가 서비스를 하고 있는 줌투자, 인베스팅뷰를 예를 들겠다.

<img src="../images/spring/스크린샷 2023-11-22 오후 6.53.16.png" style="display: block; margin: auto; width: 70%;" alt=""/>

위와 같이 투자노트라든지 또 뉴스와 같은 콘텐츠 기반의 데이터 서빙은 글로벌하게 캐싱을 하지 않아도 된다. 왜? 사용자 입장에서 콘텐츠와 같은 부분은 크게 동기화 이슈 지장이 없기 때문이다. 가령, 1초의 간격으로 A라는 사람은 새로운 투자노트를 보게 될수도 B라는 사람은 못보게 될수도 있다. 다만, 그 1초에 큰 의의를 두지 않는다.

좀 더 요약하자면 애플리케이션의 각 인스턴스가 자체적인 캐시를 유지하며, 다른 인스턴스와 캐시를 공유하지 않는 경우에 적합하다. 그래서 제한 적인 부분이 **스케일 아웃**에 대한 제한이 있다. 애플리케이션이 여러 서버에 분산될 경우, 각 서버의 캐시는 독립적이므로 캐시 데이터의 일관성을 유지하기 어렵다.

물론, 특수한 경우가 있을 수 있다. 콘텐츠 기반의 데이터라 해도 동기화에 중요한 콘텐츠라면 로컬 캐시를 쓰면 안된다. 자, 이제 코드를 보자.

<img src="../images/spring/스크린샷 2023-11-22 오후 6.53.58.png" style="display: block; margin: auto; width: 70%;" alt=""/>

모듈화와 재사용성에 용이하도록 구현이 된 코드이다.



1. **코드 분리**: 캐시 구성을 각각의 독립적인 모듈(인터페이스)로 분리함으로써, 각 캐시 설정의 관리가 편해진다.
2. **재사용성**: 동일한 유형의 캐시 구성이 다른 곳에서 필요할 경우, 해당 인터페이스를 구현함으로써 재사용에 용이하다.
3. **확장성**: 새로운 캐시 유형이 필요한 경우, 새로운 인터페이스를 추가하고 기존 클래스에 구현추가만 하면 되므로 확장에 용이하다.

```java
@Slf4j
@Configuration
@EnableCaching(proxyTargetClass = true)
public class EhCacheCachingManagerConfig implements 
        CachingConfigurer,
        MarketEhcacheConfig,
        NewsEhcacheConfig {

    // 모듈 캐시 기본 설정
    private static final Boolean moduleCacheCacheEternal = true;
    private static final String moduleCacheEvictionPolicy = "LFU";
    private static final Long moduleCacheMaxEntriesLocalHeap = 500L;

    /**
     * 캐시 등록
     * @return CacheManager
     */
    @Bean(name = "ehCacheSettingManager", destroyMethod = "shutdown")
    public net.sf.ehcache.CacheManager ehCacheManager() {
        net.sf.ehcache.config.Configuration config = new net.sf.ehcache.config.Configuration();
        addMarketCache(config);
        addNewsCache(config);
        return net.sf.ehcache.CacheManager.newInstance(config);
    }

    @Bean(name = CacheManagerType.EHCACHE)
    @Override
    public org.springframework.cache.CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheManager());
    }

    @Override
    public CacheResolver cacheResolver() {
        return new SimpleCacheResolver(cacheManager());
    }

    @Override
    public KeyGenerator keyGenerator() {
        return new SimpleKeyGenerator();
    }

    @Override
    public CacheErrorHandler errorHandler() {
        return new SimpleCacheErrorHandler();
    }

    /**
     * 모듈 캐시 기본 설정을 적용하는 메소드
     * @param name 캐시명
     * @return CacheConfiguration
     */
    static CacheConfiguration getDefaultModuleCacheConfiguration(final String name) {
        CacheConfiguration cacheConfiguration = new CacheConfiguration();
        cacheConfiguration.setName(name);
        cacheConfiguration.setEternal(moduleCacheCacheEternal);
        cacheConfiguration.setMemoryStoreEvictionPolicy(moduleCacheEvictionPolicy);
        cacheConfiguration.setMaxEntriesLocalHeap(moduleCacheMaxEntriesLocalHeap);
        return cacheConfiguration;
    }
}

//
public interface NewsEhcacheConfig {

    String CE_NEWS = "NEWS:CACHE:";

    String CE_LATEST_TOP_NEWS = CE_NEWS + "LATEST:TOP_NEWS";
    String CE_LATEST_TOP_NEWS_ = "'" + CE_LATEST_TOP_NEWS + "'";
    Integer CE_LATEST_TOP_NEWS_TTL = 60 * 5;

    default void addNewsCache(final net.sf.ehcache.config.Configuration config) {
        config.addCache(latestTopNewsCache());
    }

    private CacheConfiguration latestTopNewsCache() {
        CacheConfiguration configuration = EhCacheCachingManagerConfig.getDefaultModuleCacheConfiguration(CE_LATEST_TOP_NEWS);
        configuration.setEternal(false);
        configuration.setTimeToLiveSeconds(CE_LATEST_TOP_NEWS_TTL);
        return configuration;
    }
}

//
@Cacheable(cacheNames = NewsEhcacheConfig.CE_LATEST_TOP_NEWS,
key = NewsEhcacheConfig.CE_LATEST_TOP_NEWS_,
unless = "#result == null",
cacheManager = CacheManagerType.EHCACHE) {
   // logic
}

```

## 가보자고 - 글로벌 캐시

Global 하게 캐싱을 해야할 때,

동기화에 문제가 있는 경우 보통 레디스에 캐싱처리를 한다. 즉, 스케일 아웃할 때 데이터 정합성, 일관성에 문제가 있는 경우 로컬캐시가 아닌 레디스를 이용하여 캐싱처리를 한다.

인베스팅뷰 같은 경우, 메코차트라든지 여러 종목에 대한 정보같은 경우 각 인스턴스에 다른 데이터가 캐싱되면 안된다. 즉, 동기화에 민감한 도메인이므로 이런 경우 레디스를 이용하여 캐싱을 한다.

레디스에 해당 key에 대한 value가 있는 경우, 레디스에서 가져오고 만약 없는 경우 DB( I/O ) 에 데이터를 조회해서 레디스에 다시 저장하고 Client에 데이터를 쏴준다.

<img src="../images/spring/스크린샷 2023-11-22 오후 6.53.52.png" style="display: block; margin: auto; width: 70%;" alt=""/>

```java
@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableCaching(proxyTargetClass = true)
public class RedisCachingManagerConfig implements 
		OverseasRedisConfig,
    StockRedisConfig {
    
    private final RedisConnectionFactory redisConnectionFactory;

    @Bean(name = CacheManagerType.REDIS)
    public CacheManager redisCacheManager() {
        RedisCacheConfiguration config = getRedisCacheConfiguration();

        Map<String, RedisCacheConfiguration> configMap = new HashMap<>();
        addOverSeasRedisCache(config, configMap);
        addStockCache(config, configMap);

        return RedisCacheManager.builder( // change search all from keys to scan
            RedisCacheWriter.nonLockingRedisCacheWriter(
                redisConnectionFactory,
                BatchStrategies.scan(CACHE_BATCH_SIZE)))
            .cacheDefaults(config)
            .withInitialCacheConfigurations(configMap)
            .build();
    }

    private RedisCacheConfiguration getRedisCacheConfiguration() {
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.activateDefaultTypingAsProperty(
            LaissezFaireSubTypeValidator.instance,
            ObjectMapper.DefaultTyping.NON_FINAL,
            "@class");
        objectMapper.registerModules(new JavaTimeModule(), new Jdk8Module());

        return RedisCacheConfiguration.defaultCacheConfig()
            .disableCachingNullValues() // null value 의 경우 캐시 X
            .serializeKeysWith(
                RedisSerializationContext
                    .SerializationPair
                    .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(
                RedisSerializationContext
                    .SerializationPair
                    .fromSerializer(new GenericJackson2JsonRedisSerializer(objectMapper)))
            .disableKeyPrefix();
    }

    @Bean("overSeasCacheKeyGenerator")
    public KeyGenerator overSeasCacheKeyGenerator() {
        return new OverSeasRedisKeyGenerator();
    }

}

// 
public interface StockRedisConfig {

    String CE_STOCK = "STOCK:CACHE:";
		String CE_STOCK_RELATED = CE_STOCK + "RELATED";
    String CE_STOCK_RELATED_ = "'" + CE_STOCK_RELATED + "'" ;
    Integer CE_STOCK_STATEMENTS_TTL = 60 * 60 * 24; // 하루

    default void addStockCache(RedisCacheConfiguration config, Map<String, RedisCacheConfiguration> map) {
        allStocksStatements(config, map);
        stockRelated(config, map);
    }

    private void allStocksStatements(RedisCacheConfiguration config, Map<String, RedisCacheConfiguration> configMap) {
        configMap.put(CE_STOCK_STATEMENTS, config);
        configMap.put(CE_STOCK_STATEMENTS, config.entryTtl(Duration.ofSeconds(CE_STOCK_STATEMENTS_TTL)));
    }
}
```

로컬캐시인 ehcache 와 같은 로직이다. 설정에 대한 부분은 RedisCachingManagerConfig 에 설정을 해놓고 해당 데이터에 대한 키값 설정과 TTL 은 인터페이스를 이용해서 구현한다.

인베스팅뷰와 줌투자 같은 경우, 데이터파이프 라인을 이용하여 레디스에 데이터를 적재하고 그 레디스를 인베스팅뷰, 줌투자 각각 동일한 데이터로 서빙을 한다.

<img src="../images/spring/스크린샷 2023-11-22 오후 6.53.30.png" style="display: block; margin: auto; width: 70%;" alt=""/>

```java

public FinanceRealTimeStockResponse getRealTimeStock(String stockCode) {
    try {
      HashOperations<String, String, Object> hashOperations = financeRedisTemplate.opsForHash();
      Optional<StockStandardCode> optionalStockStandardCode = getStockStandardCode(stockCode);
      String standardCode = optionalStockStandardCode
          .orElseThrow(IllegalArgumentException::new)
          .getStandardCode();
      Map<String, Object> entries = hashOperations.entries(StockRedisKey.StockKey(standardCode));

			// stock, stockTrading, stockIndicator
      AStock aStock = objectMapper.convertValue(entries.get(StockRedisKey.STOCK_HASH_KEY), Stock.class);
      AStockTrading aStockTrading = objectMapper.convertValue(entries.get(StockRedisKey.STOCK_TRADING_HASH_KEY), StockTrading.class);
      AStockIndicator aStockIndicator = objectMapper.convertValue(entries.get(StockRedisKey.STOCK_INDICATOR_HASH_KEY), StockIndicator.class);

      return AStockResponse.of(Stock, aStockTrading, aStockIndicator, logoImageUri);
    } catch (Exception e) {
			log.error("getRealTimeStock error :: {}", e.getMessage(), e);
      return new AStockResponse();
    }
  }

//

@Configuration
public class RedisConfig {

  @Value("${spring.redis.host}")
  private String redisHost;

  @Value("${spring.redis.port}")
  private Integer redisPort;

  @Bean
  public LettuceConnectionFactory redisConnectionFactory() {
    RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
    redisStandaloneConfiguration.setHostName(redisHost);
    redisStandaloneConfiguration.setPort(redisPort);
    return new LettuceConnectionFactory(redisStandaloneConfiguration);
  }

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    objectMapper.registerModules(new JavaTimeModule(), new Jdk8Module());
    return objectMapper;
  }

  @Bean("ARedisTemplate")
  public RedisTemplate<String, Object> ARedisTemplate(ObjectMapper objectMapper) {
    GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory());
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(serializer);
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(serializer);
    return redisTemplate;
  }

  @Bean("redisAsyncCommands")
  public RedisAsyncCommands<String, Object> redisAsyncCommands(ObjectMapper objectMapper) {
    RedisURI redisURI = RedisURI.create(redisHost, redisPort);
    RedisClient redisClient = RedisClient.create(redisURI);
    return redisClient.connect(new StringObjectRedisCodec(objectMapper))
        .async();
  }
}
```