import { Service } from "../service";
import express, {Express} from "express";
import {uuid} from 'uuid'
import { createImageRouter } from "./imageRoutes/router";
import { S3service } from "../s3Client";
import { ImageModelType } from "../DB/models/Image/model";
import { RedisService } from "../redisService/redisClient";
import { Config } from "../../config";
const cors = require("cors");
export class Server extends Service {
    s3Service: S3service
    imageModel: ImageModelType
    port: number
    redisClient: RedisService
    config: Config

    constructor(config:Config, s3Service: S3service,imageModel: ImageModelType,redisClient: RedisService) {
        super();
        this.s3Service = s3Service;
        this.imageModel = imageModel;
        this.redisClient = redisClient;
        this.port = config.PORT;
        this.config = config;
    }

    registerRoutes(app: Express) {
        app.use("/hello", (req, res) => {
            res.send("World")
        })
        app.use("/images",createImageRouter(this.s3Service,this.imageModel,this.redisClient,{
            interval: this.config.RATE_INTERVAL,
            limit: this.config.RATE_LIMIT
        }))
    }

    registerMiddleware(app: Express){
        app.use(async (req, res, next) => {
            //here I should use the authentication provider to authenticate the user
            //in our case I will randomize the name of the user
            // req.headers["x-username"] = uuid();
            req.headers["x-username"] = "ran sarusi"
            next();
        })
    }

    async startService(): Promise<void> {
        const app = express();
        app.use(cors());
        this.registerMiddleware(app);
        this.registerRoutes(app);
        app.listen(this.port, () => {
            console.log("listening on port " + this.port);            
        })

    }

}