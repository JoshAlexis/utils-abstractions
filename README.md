# Utils Abstractions

A collection of utilities and abstractions for logging, middlewares, etc.

## API Documentation

### Logger

#### BaseLogger

Defines the logger's structure. Imported from `utils-abstractions/logger/abstractions`.

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
Imported from `utils-abstractions/logger/abstractions`.

```typescript
interface BaseMetadataFields extends Record<string, string | number | unknown> {
    domain?: string
    layer?: 'Application' | 'Infrastructure' | 'Presentation' | 'None' | string
    context?: string
}
```

These fields are based in the concepts of Clean Architecture. For an initial approach *domain* can be similar to a module or submodule.

#### LoggerContainer

Imported from `utils-abstractions/logger`

Stores implementations of `BaseLogger`.

Because you can have different logging mechanisms (console, files, stream, etc.) this container keeps all the
defined implementations and allows you, either all or one definition depending on the needed context.

Each implementation is mapped to a name, this allows you to select an instance to use. In the case we want to use
all the registered implementations you can use the log level method that you need.

Also, it is configured to be used as dependency with [Inversify](https://inversify.io/).

```typescript
class LoggerContainer implements BaseLogger
```

#### Logger Implementations

- *WinstonLogger*: Using [winston](https://www.npmjs.com/package/winston).
- *SeqLogger*: Using [datalust/winston-seq](https://www.npmjs.com/package/@datalust/winston-seq).
- *LokiLogger*: Using [winston-loki](https://www.npmjs.com/package/winston-loki).

#### getRequestData

Adds information about the request to the metadata.

```typescript
function getRequestData(metadata: BaseMetadataFields): BaseMetadataFields
```

---
### CORS

Imported from `utils-abstractions/cors`.

#### corsOptions

Defines a configuration for allowed origins. The list of origins comes from then env `ALLOWED_ORIGINS` in a single
string separated by comma.

```typescript
const corsOptions: CorsOptions
```

#### credentialsHeader

Sets the header `Access-Control-Allow-Credentials` to the request with an allowed origin.

```typescript
function credentialsHeader(req: Request, res: Response, next: NextFunction)
```

---
### Middlewares

Imported from `utils-abstractions/middlewares`.

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

Fetch data from the request and keep it in memory. Works together a logger and it takes the values of:

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

A custom implementation of `morgan` for http request. Requires a logger due the default logger is the console.

```typescript
function morganCustomLogger(logger: BaseLogger): Handler<IncomingMessage, ServerResponse<IncomingMessage>>
```
