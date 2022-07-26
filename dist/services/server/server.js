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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const service_1 = require("../service");
const express_1 = __importDefault(require("express"));
const router_1 = require("./imageRoutes/router");
const cors = require("cors");
class Server extends service_1.Service {
    constructor(config, s3Service, imageModel, redisClient) {
        super();
        this.s3Service = s3Service;
        this.imageModel = imageModel;
        this.redisClient = redisClient;
        this.port = config.PORT;
        this.config = config;
    }
    registerRoutes(app) {
        app.use("/hello", (req, res) => {
            res.send("World");
        });
        app.use("/images", (0, router_1.createImageRouter)(this.s3Service, this.imageModel, this.redisClient, {
            interval: this.config.RATE_INTERVAL,
            limit: this.config.RATE_LIMIT
        }));
    }
    registerMiddleware(app) {
        app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //here I should use the authentication provider to authenticate the user
            //in our case I will randomize the name of the user
            // req.headers["x-username"] = uuid();
            req.headers["x-username"] = "ran sarusi";
            next();
        }));
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = (0, express_1.default)();
            app.use(cors());
            this.registerMiddleware(app);
            this.registerRoutes(app);
            app.listen(this.port, () => {
                console.log("listening on port " + this.port);
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map