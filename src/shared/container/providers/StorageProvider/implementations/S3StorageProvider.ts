import { IStorageProvider } from "../IStorageProvider";
import fs from 'fs';
import { resolve } from 'path';
import mime from 'mime';
import { S3 } from 'aws-sdk';
import upload from "../../../../../config/upload";


class S3StorageProvider implements IStorageProvider {

    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        })
    }


    async save(file: string, folder: string): Promise<string> {
        // esse é apenas o path
        
        const originalName = resolve(upload.tmpFolder, file);

        // agora pega o arquivo mesmo
        const fileContent =  await fs.promises.readFile(originalName);

        // quero que o usuário através da URL veja a imagem, não que ele faça o download (usa mime library)
        const ContentType = mime.getType(originalName);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file, 
                //permissão de visualização
                // ACL: "public-read",
                Body: fileContent, 
                ContentType,
            })
            .promise(); // transforma a função em uma promise 

        
        await fs.promises.unlink(originalName);

        return file;
        
    }
    async delete(file: string, folder: string): Promise<void> {
        
       await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file, 
        }).promise();
        
    }
    
}

export { S3StorageProvider }