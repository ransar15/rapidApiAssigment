"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const service_1 = require("./service");
class RedisService extends service_1.Service {
    constructor() {
        super();
    }
    startService() {
        throw new Error("Method not implemented.");
    }
}
exports.RedisService = RedisService;
