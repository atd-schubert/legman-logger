import { iterate } from "leakage";
import Legman from "legman";
import Logger from "./";

const defaultTimeout = 60000; // sorry for that, but leakage tests take a lot of time!
const leakingTestIterations = 10;
const unleakingTestIterations = 100;
function noop(): void {
    // do nothing...
}
function sleep(ms = 1000): Promise<void> {
    return new Promise((resolve) => void setTimeout(resolve, ms));
}

describe("Legman leakage tests", () => {
    describe("un-leaky", () => {
        it("should not leak while logging messages with a consumer", async () => {
            const base = new Legman();
            base.on("data", noop);
            const logger = new Logger();
            logger.pipe(base);

            return iterate.async(() => {
                for (let i = 0; i < unleakingTestIterations; i += 1) {
                    logger.write({msg: "test"});
                    logger.error({msg: "error"});
                    logger.warn({msg: "warn"});
                    logger.log({msg: "log"});
                    logger.info({msg: "info"});
                    logger.debug({msg: "debug"});
                    logger.verbose({msg: "verbose"});
                }
                return sleep(1);
            }).then(() => logger.end());
        }).timeout(defaultTimeout);
        it("should not leak while ending loggers", async () => {
            const base = new Legman();
            base.on("data", noop);

            return iterate.async(() => {
                for (let i = 0; i < unleakingTestIterations; i += 1) {
                    const logger = new Logger();
                    logger.pipe(base);
                    logger.end();
                }
                return sleep(5);
            });
        }).timeout(defaultTimeout);
        it("should not leak while not ending loggers as influx from another logger", async () => {
            const base = new Legman();
            base.on("data", noop);
            const baseLogger = new Logger();
            baseLogger.pipe(base);

            return iterate.async(() => {
                for (let i = 0; i < unleakingTestIterations; i += 1) {
                    const logger = baseLogger.influx();
                    logger.verbose("Iterate...");
                }
                return sleep(5);
            });
        }).timeout(defaultTimeout);
    });
    describe("leaky", () => {
        it("should leak while being not consumed", async () => {
            const noError = new Error("No error was emitted");
            const base = new Legman();
            const logger = new Logger();
            logger.pipe(base);

            return iterate.async(() => {
                for (let i = 0; i < leakingTestIterations; i += 1) {
                    logger.write({msg: "test"});
                    logger.error({msg: "error"});
                    logger.warn({msg: "warn"});
                    logger.log({msg: "log"});
                    logger.info({msg: "info"});
                    logger.debug({msg: "debug"});
                    logger.verbose({msg: "verbose"});
                }
                return sleep(1);
            }).then(() => logger.end())
                .then(() => {
                    throw noError;
                })
                .catch((err) => { if (err === noError) {throw noError; }});
        }).timeout(defaultTimeout);
        it("should leak while not ending loggers", async () => {
            const noError = new Error("No error was emitted");
            const base = new Legman();
            base.on("data", noop);

            return iterate.async(() => {
                for (let i = 0; i < leakingTestIterations; i += 1) {
                    const logger = new Logger();
                    logger.pipe(base);
                }
                return sleep(1);
            })
                .then(() => {
                    throw noError;
                })
                .catch((err) => { if (err === noError) {throw noError; }});
        }).timeout(defaultTimeout);
    });
});
