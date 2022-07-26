import { Service } from "./service";

export class S3service extends Service{
    constructor() {
        super();
    }
    
    async startService(): Promise<void> {
        //connect to the s3 cluster
    }

    async fetch(key: string): Promise<Buffer> {
        return new Buffer(key);
    }

    async upload(data: Buffer): Promise<void> {
        //upload data to the s3 cluster
    }

    async delete(key: string): Promise<void> {
        //delete the object from the s3 cluster
    }

}