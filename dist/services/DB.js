"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const service_1 = require("./service");
class DB extends service_1.Service {
    constructor() {
        super();
    }
    startService() {
        throw new Error("Method not implemented.");
    }
}
exports.DB = DB;
