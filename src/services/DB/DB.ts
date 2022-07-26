import { Service } from "../service";
import { ImageModel } from "./models/Image/model";

export class DB extends Service{
    connectionString: string;
    constructor(connectionString) {
        super();
        this.connectionString = connectionString;
    }
    
    async startService(): Promise<void> {
        // throw new Error("Method not implemented.");
    }

    getDbModels() {
        return {imageModel: ImageModel};
    }

}