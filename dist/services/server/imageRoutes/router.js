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
exports.createImageRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const dal_1 = require("../../DB/models/Image/dal");
const getUserName = (req) => req.headers["x-username"];
const createImageRouter = (S3service, imageModel, redisClient, rateLimit) => {
    const router = new express_1.Router();
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        //fetch data from the s3 service and send to the user
        const data = yield S3service.fetch(id);
        res.send(data);
    }));
    //middleware before the data is written
    // router.post("/:id", async (req, res,next) => {
    //     const userId = getUserName(req);
    //     const shouldLimit = await shouldLimitRate(redisClient,userId,rateLimit.interval,rateLimit.limit);
    //     if(shouldLimit)
    //         return res.status(429).send("Too Many Requests")
    //     next();
    // })
    router.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { body } = req;
        const userId = getUserName(req);
        //read data from the request
        const buffer = req.data;
        //upload to the s3 cluster
        yield S3service.upload(buffer);
        //write data to the database
        yield (0, dal_1.addImage)(imageModel, Object.assign(Object.assign({}, body), { userId, _id: new mongodb_1.ObjectId() }));
        res.send("image added successfully");
    }));
    router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const userId = getUserName(req);
        const { imageName } = req.body;
        //delete data from the s3 service
        const data = yield S3service.delete(id);
        //remove document from the database
        yield (0, dal_1.deleteImage)(imageModel, userId, imageName);
        res.send("image deleted successfully");
    }));
    return router;
};
exports.createImageRouter = createImageRouter;
//# sourceMappingURL=router.js.map