import { Router } from 'express'
import { ObjectId } from 'mongodb';
import { addImage, deleteImage } from '../../DB/models/Image/dal';
import { ImageModelType } from '../../DB/models/Image/model';
import { shouldLimitRate } from '../../redisService/redis.utils';
import { RedisService } from '../../redisService/redisClient';
import { S3service } from '../../s3Client';

const getUserName = (req) => req.headers["x-username"]

export const createImageRouter = (S3service: S3service, imageModel: ImageModelType, 
    redisClient: RedisService, rateLimit: { interval: number, limit: number}) => 
    {
    const router = new Router();
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        //fetch data from the s3 service and send to the user
        const data = await S3service.fetch(id)
        res.send(data);
    })

    //middleware before the data is written
    router.post("/:id", async (req, res,next) => {
        const userId = getUserName(req);
        const shouldLimit = await shouldLimitRate(redisClient,userId,rateLimit.interval,rateLimit.limit);
        if(shouldLimit)
            return res.status(429).send("Too Many Requests")
        next();
    })

    router.post("/:id", async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const userId = getUserName(req);
        //read data from the request
        const buffer = req.data;
        //upload to the s3 cluster
        await S3service.upload(buffer)
        //write data to the database
        await addImage(imageModel, { ...body, userId, _id: new ObjectId() });
        res.send("image added successfully");
    })

    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const userId = getUserName(req);
        const { imageName } = req.body;
        //delete data from the s3 service
        const data = await S3service.delete(id)
        //remove document from the database
        await deleteImage(imageModel, userId, imageName);
        res.send("image deleted successfully");
    })

    return router;

}