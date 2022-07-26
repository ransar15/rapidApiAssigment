import { Config } from "./config";
import { System } from "./services/system";
const envConfig = require("./config");

const main = async () => {
    const { config } = envConfig;
    const system = new System(config);
    await system.startService();
    console.log("system is running");
}

main();