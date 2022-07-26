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
exports.System = void 0;
const DB_1 = require("./DB/DB");
const redisClient_1 = require("./redisService/redisClient");
const s3Client_1 = require("./s3Client");
const server_1 = require("./server/server");
const service_1 = require("./service");
class System extends service_1.Service {
    constructor(config) {
        super();
        this.config = config;
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbService = new DB_1.DB(this.config.MONGO_CONNECTION_STRING);
            const redisService = new redisClient_1.RedisService(this.config.REDIS_CONNECTION_STRING);
            const s3service = new s3Client_1.S3service();
            const imageModel = dbService.getDbModels()["imageModel"];
            const server = new server_1.Server(this.config, s3service, imageModel, redisService);
            yield dbService.startService();
            yield redisService.startService();
            yield s3service.startService();
            yield server.startService();
        });
    }
}
exports.System = System;
//# sourceMappingURL=system.js.map