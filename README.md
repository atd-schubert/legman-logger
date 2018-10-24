# Legman-Logger

The LegmanLogger enhances [Legman](https://github.com/atd-schubert/legman) with the basic logging methods `error`,
`warn`, `info`, `debug`, `verbose`. All these methods enhance messages with a loglevel on a symbol and a configurable
property-name (default is `loglevel`). The will also add a `timestamp` property.

In addition this logger creates sub-logger in sloppy mode with the influx method instead of Legman streams in non-sloppy
mode.


## How to use

At first you have to install this module and Legman into your application:

```bash
npm i --save legman legman-logger
# OR
yarn add legman legman-logger
```

After that you can import and use Legman in your code.

### Using Legman in typescript

```typescript
import LegmanLogger from "legman-logger";
const logger = new LegmanLogger({app: "my identifier for an app"});
logger

// This module works great with logstash:
// import LegmanLogstash from "legman-logstash";
// logger.pipe(new LegmanLogstash(1234, "logstash-hostname"));

const httpLogger = logger.influx({context: "http"});
httpLogger.info({ msg: "Starting up server" });
const startupSequenceSubLogger = httpLogger.influx({job: "startup-sequence"});
startupSequenceSubLogger.debug({ msg: "Searching for startup sequence" });
startupSequenceSubLogger.verbose({ msg: "0 possibilities to look for a startup sequence" });
httpLogger.warn({ msg: "No startup sequence found" });
httpLogger.error({ msg: "Server is not running", reason: "No code available" });
```

### JavaScript

```js
const LegmanLogger = require("legman-logger");
const logger = new LegmanLogger({app: "my identifier for an app"});

// This module works great with logstash:
// const LegmanLogstash = require("legman-logstash");
// logger.pipe(new LegmanLogstash(1234, "logstash-hostname"));

const httpLogger = logger.influx({context: "http"});
httpLogger.info({ msg: "Starting up server" });
const startupSequenceSubLogger = httpLogger.influx({job: "startup-sequence"});
startupSequenceSubLogger.debug({ msg: "Searching for startup sequence" });
startupSequenceSubLogger.verbose({ msg: "0 possibilities to look for a startup sequence" });
httpLogger.warn({ msg: "No startup sequence found" });
httpLogger.error({ msg: "Server is not running", reason: "No code available" });
```

## Example

You can run a simple example by executing `npm run docker:example`. After that you can open a simple webserver with your
browser on your docker-host's port `8080`.

The example will handle requests randomly and logs messages on your console where you run the above describes command.
The source code of the example is located at the `./example` folder.

## Script tasks

* `transpile`: Transpiles the library from TypeScript into JavaScript with type declarations
* `lint`: Lints your code against the recommend TSLint ruleset.
* `test`: Transpiles, lints and runs software-tests with coverage.
* `leakage`: Transpiles, lints and runs software-tests with leakage tests.
* `docker:lint`: Runs the `lint` task in a docker environment.
* `docker:test`: Runs the `test` task in a docker environment.
* `docker:leakage`: Runs the `leakage` task in a docker environment.
* `docker:example`: Runs an example within the docker environment.

## License

This module is under [ISC license](LICENSE) copyright 2018 by [Arne Schubert](mailto:atd.schubert@gmail.com)
