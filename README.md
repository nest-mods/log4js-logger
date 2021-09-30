# Log4jsLogger

NestJS Logger log4js implementation

## simple usage
```ts
setupLog4js(); // setup log4js, left no arg to using default configs

Logger.overrideLogger(new Log4jsLogger()); // using Log4jsLogger implementation
```
