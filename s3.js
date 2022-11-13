const { S3 } = require("aws-sdk");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3();
exports.s3Uploadv2 = async (files, token) => {

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${token}/${file.originalname}`,
      Body: file.buffer,
    };
  });
  return await Promise.all(params.map((param) => s3.upload(param).promise()));
}

exports.s3Listobjects = async (token) => {

  let r = await s3.listObjectsV2({ Bucket: process.env.AWS_BUCKET_NAME, Prefix: token,Delimiter:token }).promise();
  // let x = r.Contents.map(item => item.Key);
  // console.log(x);

  return r;

}
exports.s3DeleteObjects = async (token) => {
  let keys= this.s3Listobjects(token);
  const objects = (await keys).Contents.map(Key => Key.Key);
  console.log(objects)
  let r=await s3.deleteObjects({ Bucket: process.env.AWS_BUCKET_NAME, Delete: objects }).promise();
  console.log(r);
}

exports.s3DownloadObjects = async (file) => {
  let r = await s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: file }).promise();
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