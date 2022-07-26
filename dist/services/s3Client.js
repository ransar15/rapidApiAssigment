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
exports.S3service = void 0;
const service_1 = require("./service");
class S3service extends service_1.Service {
    constructor() {
        super();
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            //connect to the s3 cluster
        });
    }
    fetch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Buffer(key);
        });
    }
    upload(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //upload data to the s3 cluster
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            //delete the object from the s3 cluster
        });
    }
}
exports.S3service = S3service;
//# sourceMappingURL=s3Client.js.map