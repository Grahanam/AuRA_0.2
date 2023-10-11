const {PutObjectCommand,DeleteObjectCommand} = require("@aws-sdk/client-s3");
const bucketName = process.env.S3_BUCKET;

const uploadfile=(file,fileName)=>{
    let params = {
      Bucket: bucketName,
      Key:  fileName+file.originalname,
      Body: file.buffer ,
      ContentType: file.mimetype,
    };
    return command = new PutObjectCommand(params);
  }


module.exports=uploadfile