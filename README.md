# Utils Abstractions

A collection of utilities and abstractions for logging, middlewares, etc.

## API Documentation

### Logger

#### BaseLogger

Defines the logger's structure.

```typescript
interface BaseLogger {
    info(message: string, meta?: any): void
    debug(message: string, meta?: any): void
    error(message: string, meta?: any): void
    warn(message: string, meta?: any): void
    http(message: string, meta?: any): void
}
```

#### BaseMetadataFields

Defines the fields for the metadata of logging. All the new definitions *must* extend from this interface.

```typescript
interface BaseMetadataFields extends Record<string, string | number | unknown> {
    domain?: string
    layer?: 'Application' | 'Infrastructure' | 'Presentation' | 'None' | string
    context?: string
}
```

#### Log message structure

The structure of the log messages is the next:

```shell
[2023-03-30 12:16:16.0761 PM] [log-level] [domain.layer.context]: Database connected
```

These fields are based in the concepts of Clean Architecture. For an initial approach *domain* can be similar to a module or submodule.

#### LoggerContainer

Stores implementations of `BaseLogger`.

Because you can have different logging mechanisms (console, files, stream, etc.) this container keeps all the
defined implementations and allows you, either all or one definition depending on the needed context.

Each implementation is mapped to a name, this allows you to select an instance to use. In the case we want to use
all the registered implementations you can use the log level method that you need.

Also, it is configured to be used as dependency with [Inversify](https://inversify.io/).

```typescript
class LoggerContainer implements BaseLogger {...}
```

#### Errors

- `LoggerAlreadyRegisteredError`
- `LoggerNotExists`

#### Example
```typescript
// Register a new logger, in case there already exists throws an error
loggerContainer.addLogger('winston-console', new WinstonLogger())

// Get an instancia, in case there is no exists throws an error
const logger = loggerContainer.getLogger('winston-console')

logger.debug('Hello ..')

// Delete an instance, in case there is no exists throws an error
loggerContainer.removeLogger('winston-console')

// Use all registered loggers
loggerContainer.info('Logging for all')
```

#### Logger Implementations

- *WinstonLogger*: Using [winston](https://www.npmjs.com/package/winston).
- *SeqLogger*: Using [datalust/winston-seq](https://www.npmjs.com/package/@datalust/winston-seq). 
  - Depends on `SEQ_SERVER` and `SEQ_TOKEN`.
- *LokiLogger*: Using [winston-loki](https://www.npmjs.com/package/winston-loki). 
  - Depends on `LOKI_SERVER`, `LOKI_INTERVAL` and `LOKI_APP_LABEL` env.
  - In case that `LOKI_APP_LABEL` is not assigned the default value is *logger-container*.

#### getRequestData

Adds information about the request in the metadata. Sets the fields:

- url
- method

```typescript
function getRequestData(metadata: BaseMetadataFields): BaseMetadataFields
```

#### showDebugQuery

Add the query to the logs. Depends on the env `SHOW_QUERY` with the value *show*.

```typescript
function showDebugQuery(message: string, query: string): string
```

---
### CORS

#### corsOptions

Defines a configuration for allowed origins. The list of origins comes from then env `CORS_ORIGINS` in a single
string separated by commas.

#### Example

```typescript
const corsOptions: CorsOptions

// CORS_ORIGINS = https://dev.test.app,https://admin.test.app
```

#### credentialsHeader

Sets the header `Access-Control-Allow-Credentials` to the request based on the `CORS_ORIGINS`.

```typescript
function credentialsHeader(req: Request, res: Response, next: NextFunction)
```

---
### Middlewares

#### errorHandler

An *express* error middleware to handle error responses.

```typescript
function errorHandler(err: any, req: Request, res: Response, next: NextFunction)
```

#### HelmetConfig

The *Helmet* middleware with custom options for:

- hidePoweredBy
- dnsPrefetchControl
- frameguard
- noSniff
- xssFilter

```typescript
const HelmetConfig = helmet({ ... })
```

#### httpRequestData

Fetch data from the request and keep it in memory. Works together a logger, and it takes the values of:

- *body*
- *params*
- *query*
- *headers*
- *url*
- *method*

```typescript
function httpRequestData(logger: BaseLogger): (req: Request, res: Response, next: NextFunction) => void
```

### morganCustomLogger

A custom implementation of `morgan` for http request.

```typescript
function morganCustomLogger(logger: BaseLogger): Handler<IncomingMessage, ServerResponse<IncomingMessage>>
```

### Auth

#### JwtStrategyOptions

Default configurations for `passport-jwt` with:

- Extract token from Authorization Header (Bearer)
- Issuer
- Algorithms

Requires the env `JWT_ACCESS_SECRET`, `JWT_ISSUER` and `JWT_ALGORITHM`

```typescript
const JWT_STRATEGY_OPTIONS: StrategyOptions
```
