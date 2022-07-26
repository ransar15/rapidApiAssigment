import { Service } from "../service";
import { createClient, RedisClientType } from 'redis';

export class RedisService extends Service {
    redisConnectionString: string;
    client: RedisClientType
    constructor(connectionString: string) {
        super();
        this.redisConnectionString = connectionString;
        this.client = createClient();
    }

    async startService(): Promise<void> {
        this.client.connect();
    }

    async setTTL(key: string, ttl: number): Promise<boolean> {
        return this.client.expire(key, ttl);
    }

    async incrementData(key: string): Promise<number> {
        return this.client.incr(key)
    }

}