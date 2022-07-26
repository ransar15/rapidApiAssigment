"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const service_1 = require("../service");
const redis_1 = require("redis");
class RedisService extends service_1.Service {
    constructor(connectionString) {
        super();
        this.redisConnectionString = connectionString;
        this.client = (0, redis_1.createClient)();
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.connect();
        });
    }
    setTTL(key, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.expire(key, ttl);
        });
    }
    incrementData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.incr(key);
        });
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redisClient.js.map