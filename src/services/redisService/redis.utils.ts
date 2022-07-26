import { RedisService } from "./redisClient";

export const shouldLimitRate = async (redisClient: RedisService, userId:string, interval: number, rate: number) => {
    const requests = await redisClient.incrementData(userId)
    //set the TTL if its the first entry
    if(requests == 1)
        await redisClient.setTTL(userId,interval);
    //if more requests were made inside the interval than the expected rate then return true
    return requests >= rate;
}