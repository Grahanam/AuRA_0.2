const {PutObjectCommand,DeleteObjectCommand} = require("@aws-sdk/client-s3");
const bucketName = process.env.S3_BUCKET;

const deletefile=(url)=>{
    const urlsegment=url.split('/')
    const filename=urlsegment[urlsegment.length-1]
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });
    return deleteObjectCommand
  }


module.exports=deletefile  