import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export class AwsConnector {
    private _s3Client: S3Client
    private _bucketName: string = "fasanstorage"

    constructor() {
        this._s3Client = new S3Client({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: "AKIAVVZON4PR35DVWFMN",
                secretAccessKey: "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",
            },
        });
    }

    uploadData(jsonizedContent: string) {
        const bucketParameter = {
            Bucket: this._bucketName,
            Key: 'product6dc.json',
            Body: jsonizedContent,
            ContentType: 'application/json'
        };

        const command = new PutObjectCommand(bucketParameter);
        this._s3Client.send(command).finally()
    }
}