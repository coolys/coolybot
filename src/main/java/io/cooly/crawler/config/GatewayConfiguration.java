package io.cooly.crawler.config;

import io.github.coolys.config.CoolybotProperties;

import io.cooly.crawler.gateway.ratelimiting.RateLimitingFilter;
import io.cooly.crawler.gateway.accesscontrol.AccessControlFilter;
import io.cooly.crawler.gateway.responserewriting.SwaggerBasePathRewritingFilter;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfiguration {

    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter(){
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, CoolybotProperties coolyProperties){
            return new AccessControlFilter(routeLocator, coolyProperties);
        }
    }

    /**
     * Configures the Zuul filter that limits the number of API calls per user.
     * <p>
     * This uses Bucket4J to limit the API calls, see {@link io.cooly.crawler.gateway.ratelimiting.RateLimitingFilter}.
     */
    @Configuration
    @ConditionalOnProperty("coolybot.gateway.rate-limiting.enabled")
    public static class RateLimitingConfiguration {

        private final CoolybotProperties coolyProperties;

        public RateLimitingConfiguration(CoolybotProperties coolyProperties) {
            this.coolyProperties = coolyProperties;
        }

        @Bean
        public RateLimitingFilter rateLimitingFilter() {
            return new RateLimitingFilter(coolyProperties);
        }
    }
}
