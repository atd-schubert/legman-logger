import Legman from "legman";

export class LegmanLogger extends Legman {

    public static logLevelSymbol = Symbol("log level");
    public logLevelProperty: string | symbol = "loglevel";
    public timestampProperty: string | symbol = "timestamp";
    constructor(additionalFields: any = {}) {
        super(additionalFields);
    }

    public error(message: any) {
        const now = new Date();
        this.write({
            ...message,
            [LegmanLogger.logLevelSymbol]: "error",
            [this.logLevelProperty]: "error",
            [this.timestampProperty]: now,
            [Legman.timestampSymbol]: now,
        });
    }
    public warn(message: any) {
        const now = new Date();
        this.write({
            ...message,
            [LegmanLogger.logLevelSymbol]: "warn",
            [this.logLevelProperty]: "warn",
            [this.timestampProperty]: now,
            [Legman.timestampSymbol]: now,
        });
    }
    public log(message: any) {
        const now = new Date();
        this.write({
            ...message,
            [LegmanLogger.logLevelSymbol]: "log",
            [this.logLevelProperty]: "log",
            [this.timestampProperty]: now,
            [Legman.timestampSymbol]: now,
        });
    }
    public info(message: any) {
        const now = new Date();
        this.write({
            ...message,
            [LegmanLogger.logLevelSymbol]: "info",
            [this.logLevelProperty]: "info",
            [this.timestampProperty]: now,
            [Legman.timestampSymbol]: now,
        });
    }
    public debug(message: any) {
        const now = new Date();
        this.write({
            ...message,
            [LegmanLogger.logLevelSymbol]: "debug",
            [this.logLevelProperty]: "debug",
            [this.timestampProperty]: now,
            [Legman.timestampSymbol]: now,
        });
    }
    public verbose(message: any) {
        const now = new Date();
        this.write({
                ...message,
                [LegmanLogger.logLevelSymbol]: "verbose",
                [this.logLevelProperty]: "verbose",
                [this.timestampProperty]: now,
                [Legman.timestampSymbol]: now,
        });
    }

    /**
     * In comparison to normal lagman the logger returns a new logger instance instead of just a Legman instance on
     * the influx method. In addition influx has the sloppy mode as default mode.
     */
    public influx(additionalFields?: any, sloppy = true): LegmanLogger {
        const subLegman = new LegmanLogger(additionalFields);
        subLegman.timestampProperty = this.timestampProperty;
        subLegman.logLevelProperty = this.logLevelProperty;
        if (sloppy) {
            subLegman.on("data", (message) => this.write(message));
            return subLegman;
        }
        subLegman.pipe(this);
        return subLegman;
    }
}
