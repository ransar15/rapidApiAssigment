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
const service_1 = require("./service");
const express_1 = __importDefault(require("express"));
const cors = require("cors");
class Server extends service_1.Service {
    constructor() {
        super();
    }
    registerRoutes(app) {
        app.use("/hello", (req, res) => {
            res.sens("World");
        });
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
        });
    }
}
exports.Server = Server;
