import joi from 'joi'
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

export interface Config{
    MONGO_CONNECTION_STRING: string
    REDIS_CONNECTION_STRING: string
    PORT: number
    RATE_LIMIT: number
    RATE_INTERVAL: number
}

const envVarsSchema = joi
    .object()
    .keys({
        MONGO_CONNECTION_STRING: joi
            .string()
            .required(),
        REDIS_CONNECTION_STRING: joi
            .string()
            .required(),
        PORT: joi.number().positive().required(),
        RATE_LIMIT: joi.number().positive().required(),
        RATE_INTERVAL: joi.number().positive().required(),
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

}

module.exports = {
    config
}