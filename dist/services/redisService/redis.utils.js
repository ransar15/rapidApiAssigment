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
exports.shouldLimitRate = void 0;
const shouldLimitRate = (redisClient, userId, interval, rate) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield redisClient.incrementData(userId);
    //set the TTL if its the first entry
    if (requests == 1)
        yield redisClient.setTTL(userId, interval);
    //if more requests were made inside the interval than the expected rate then return true
    return requests >= rate;
});
exports.shouldLimitRate = shouldLimitRate;
//# sourceMappingURL=redis.utils.js.map