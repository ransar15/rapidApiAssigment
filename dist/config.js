"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../.env') });
const envVarsSchema = joi_1.default
    .object()
    .keys({
    MONGO_CONNECTION_STRING: joi_1.default
        .string()
        .required(),
    REDIS_CONNECTION_STRING: joi_1.default
        .string()
        .required(),
    PORT: joi_1.default.number().positive().required(),
    RATE_LIMIT: joi_1.default.number().positive().required(),
    RATE_INTERVAL: joi_1.default.number().positive().required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error)
    throw error;
const config = {
    MONGO_CONNECTION_STRING: envVars.MONGO_CONNECTION_STRING,
    REDIS_CONNECTION_STRING: envVars.REDIS_CONNECTION_STRING,
    PORT: envVars.PORT,
    RATE_LIMIT: envVars.RATE_LIMIT,
    RATE_INTERVAL: envVars.RATE_INTERVAL
};
module.exports = {
    config
};
//# sourceMappingURL=config.js.map