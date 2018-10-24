"use strict";
require("../lib/legman-logger.spec");

if (process.env.LEAKAGE_TEST) {
    require("../lib/legman-logger.leakage");
}
