import { expect } from "chai";
import { Writable } from "stream";
import Logger, {LegmanLogger} from "./";

describe("Legman-Logger", () => {
    describe("instantiation", () => {
        it("should be instantiatable", () => expect(new Logger()).instanceOf(Logger));
        it("should be an instance of a Writable Stream", () => expect(new Logger()).instanceOf(Writable));
    });
    describe("sending logs", () => {
        const additionalFields = {type: "logger"};
        const logger = new Logger(additionalFields);
        it("send a message directly works like the original Legman", (done: Mocha.Done) => {
            const testMessage = {msg: "this is a message without a given log-level"};
            logger.write(testMessage);
            logger.once("data", (message: any) => {
                expect(message).deep.equal({...testMessage, ...additionalFields});
                done();
            });
        });
        it("send a message over error", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an error message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "error",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.error(testMessage);
        });
        it("send a message over warn", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an warn message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "warn",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.warn(testMessage);
        });
        it("send a message over log", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an log message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "log",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.log(testMessage);
        });
        it("send a message over info", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an info message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "info",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.info(testMessage);
        });
        it("send a message over debug", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an debug message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "debug",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.debug(testMessage);
        });
        it("send a message over verbose", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an verbose message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "verbose",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.verbose(testMessage);
        });
    });
    describe("not overwrite log-level", () => {
        const additionalFields = {type: "logger"};
        const logger = new Logger(additionalFields);
        it("should not overwrite log-level to none on error", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an error message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "error",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.error(testMessage);
        });
        it("should not overwrite log-level to none on warn", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an warn message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "warn",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.warn(testMessage);
        });
        it("should not overwrite log-level to none on log", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an log message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "log",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.log(testMessage);
        });
        it("should not overwrite log-level to none on info", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an info message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "info",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.info(testMessage);
        });
        it("should not overwrite log-level to none on debug", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an debug message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "debug",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.debug(testMessage);
        });
        it("should not overwrite log-level to none on verbose", (done: Mocha.Done) => {
            const testMessage = {msg: "this is an verbose message", loglevel: "none"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ...additionalFields,
                    loglevel: "verbose",
                    timestamp: message.timestamp,
                });
                done();
            });
            logger.verbose(testMessage);
        });
    });
    describe("use specific loglevel property", () => {
        it("should add the error log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an error message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "error",
                });
                done();
            });
            logger.error(testMessage);
        });
        it("should add the warn log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an warn message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "warn",
                });
                done();
            });
            logger.warn(testMessage);
        });
        it("should add the info log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an info message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "info",
                });
                done();
            });
            logger.info(testMessage);
        });
        it("should add the log log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an log message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "log",
                });
                done();
            });
            logger.log(testMessage);
        });
        it("should add the debug log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an debug message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "debug",
                });
                done();
            });
            logger.debug(testMessage);
        });
        it("should add the verbose log level on a specific property", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = "ll";
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an verbose message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal({
                    ...testMessage,
                    ll: "verbose",
                });
                done();
            });
            logger.verbose(testMessage);
        });
    });
    describe("use a symbol as specific loglevel property", () => {
        it("should add the error log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an error message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("error");
                done();
            });
            logger.error(testMessage);
        });
        it("should add the warn log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an warn message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("warn");
                done();
            });
            logger.warn(testMessage);
        });
        it("should add the info log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an info message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("info");
                done();
            });
            logger.info(testMessage);
        });
        it("should add the log log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an log message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("log");
                done();
            });
            logger.log(testMessage);
        });
        it("should add the debug log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an debug message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("debug");
                done();
            });
            logger.debug(testMessage);
        });
        it("should add the verbose log level on a specific symbol", (done: Mocha.Done) => {
            const logger = new Logger();
            const sym = Symbol();
            logger.logLevelProperty = sym;
            logger.timestampProperty = Symbol(); // hide this property
            const testMessage = {msg: "this is an verbose message"};
            logger.once("data", (message: any) => {
                expect(message).deep.equal(testMessage);
                expect(message[sym]).equal("verbose");
                done();
            });
            logger.verbose(testMessage);
        });
    });
    describe("always adding loglevel symbol", () => {
        it("should add the log level symbol to every message on error", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an error message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("error");
                done();
            });
            logger.error(testMessage);
        });
        it("should add the log level symbol to every message on warn", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an warn message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("warn");
                done();
            });
            logger.warn(testMessage);
        });
        it("should add the log level symbol to every message on info", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an info message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("info");
                done();
            });
            logger.info(testMessage);
        });
        it("should add the log level symbol to every message on log", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an log message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("log");
                done();
            });
            logger.log(testMessage);
        });
        it("should add the log level symbol to every message on debug", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an debug message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("debug");
                done();
            });
            logger.debug(testMessage);
        });
        it("should add the log level symbol to every message on verbose", (done: Mocha.Done) => {
            const logger = new Logger();
            const testMessage = {msg: "this is an verbose message"};
            logger.once("data", (message: any) => {
                expect(message[LegmanLogger.logLevelSymbol]).equal("verbose");
                done();
            });
            logger.verbose(testMessage);
        });
    });
    describe("use specific timestamp property", () => {
        it("should add the timestamp on a specific property for error", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an error message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.error(testMessage);
        });
        it("should add the timestamp on a specific property for warn", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an warn message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.warn(testMessage);
        });
        it("should add the timestamp on a specific property for info", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an info message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.info(testMessage);
        });
        it("should add the timestamp on a specific property for log", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an log message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.log(testMessage);
        });
        it("should add the timestamp on a specific property for debug", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an debug message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.debug(testMessage);
        });
        it("should add the timestamp on a specific property for verbose", (done: Mocha.Done) => {
            const logger = new Logger();
            logger.logLevelProperty = Symbol(); // hide this property
            logger.timestampProperty = "ts";
            const testMessage = {msg: "this is an verbose message"};
            logger.once("data", (message: any) => {
                expect(message.ts).instanceOf(Date);
                done();
            });
            logger.verbose(testMessage);
        });
    });
});
