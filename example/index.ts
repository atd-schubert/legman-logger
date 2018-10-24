import { createServer } from "http";
import { v4 as uuid } from "uuid";
import Logger from "../lib";
const base = new Logger({app: "com.atd-schubert.legman-logger-test"});

// tslint:disable-next-line:no-console
base.on("data", (message) => console.log(message));

const httpLogger = base.influx({context: "http"});

const server = createServer(({url, headers, method}, res) => {
    const requestLogger = httpLogger.influx({ correlationId: uuid() });
    requestLogger.info({msg: "Incoming Request", url, headers, method });
    res.on("finish", () => {
        requestLogger.info({msg: "Response sent, request finished", statusCode: res.statusCode });
    });
    switch (Math.floor(Math.random() * 1000) % 5) {
        case 0:
        case 1:
        case 2:
            res.writeHead(200);
            res.end("It worked...");
            return;
        case 3:
            requestLogger.warn({msg: "Client provide something I don't understand"});
            res.writeHead(400);
            res.end("Wrong request");
            return;
        case 4:
            requestLogger.error(new Error("Example error in your example application"));
            res.writeHead(500);
            res.end("Server Error");
            return;
    }
});

server.listen(8080, () => httpLogger.info({msg: "server is listening", port: 8080}));
