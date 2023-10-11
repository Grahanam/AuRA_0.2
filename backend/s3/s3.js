const {S3Client} =require("@aws-sdk/client-s3");

const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_REGION;
const accessId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessId,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

module.exports=s3