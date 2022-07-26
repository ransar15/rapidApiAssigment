import { Config } from "../config";
import { DB } from "./DB/DB";
import { ImageModel, ImageModelType } from "./DB/models/Image/model";
import { RedisService } from "./redisService/redisClient";
import { S3service } from "./s3Client";
import { Server } from "./server/server";
import { Service } from "./service";

export class System extends Service{
    config: Config;
    constructor(config: Config) {
        super();
        this.config = config;

    }
    
    async startService(): Promise<void> {
        const dbService = new DB(this.config.MONGO_CONNECTION_STRING)
        const redisService = new RedisService(this.config.REDIS_CONNECTION_STRING);
        const s3service = new S3service();    
        const imageModel = dbService.getDbModels()["imageModel"] as any as ImageModelType;
        const server = new Server(this.config,s3service, imageModel,redisService);
        await dbService.startService();
        await redisService.startService();
        await s3service.startService();
        await server.startService();
    }

}