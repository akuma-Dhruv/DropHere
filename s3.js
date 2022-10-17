const { S3 } = require("aws-sdk");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const uuid = require("uuid").v4;

const s3 = new S3();
exports.s3Uploadv2 = async (file) => {
  
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
  };
  
  return await s3.upload(param).promise();
};


exports.s3Listobjects= async(token)=>{
  
  let r = await s3.listObjectsV2({ Bucket: process.env.AWS_BUCKET_NAME,Prefix:token }).promise();
  // let x = r.Contents.map(item => item.Key);
  // console.log(x);
  
  return r;
  
}
const file="uploads/Screenshot (24).png"
exports.s3DeleteObjects= async()=>{
  await s3.deleteObject({Bucket: process.env.AWS_BUCKET_NAME,Key:file}).promise();
  console.log("deleted");
}

exports.s3DownloadObjects= async(file)=>{
  let r=await s3.getObject ({Bucket: process.env.AWS_BUCKET_NAME,Key:file}).promise();
  return r;
}



// exports.s3Uploadv3 = async (files) => {
//   const s3client = new S3Client();

//   const params = files.map((file) => {
//     return {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//     };
//   });

//   return await Promise.all(
//     params.map((param) => s3client.send(new PutObjectCommand(param)))
//   );
// }