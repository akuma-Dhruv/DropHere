require("dotenv").config();
const express = require("express");
const multer = require("multer");
const {s3Uploadv2, s3Listobjects, s3DeleteObjects, s3DownloadObjects} = require("./s3");
const app = express();

// multiple file uploads

// custom filename

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  };

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 10000000000, files: 2 }
 });
// const upload = multer({ "/uploads" });

app.post("/upload", upload.single("file"), async(req, res) => {
   const result= s3Uploadv2(req.file);
    res.json({ status: "success" ,result});
    setTimeout(() => {
      
      console.log(req.file);
      console.log(result);
    }, 300);
});


app.get("/list", async (req, res) => {

   s3Listobjects();

  //console.log(r);
  // let x = r.Contents.map(item => item.Key);
  // res.send(x)
});
app.get("/delete", async (req, res) => {

   s3DeleteObjects();
});
app.get("/download/uploads/:file", async (req, res) => {
  const file = req.params.file
  
      console.log(
        file
      );
   let r=s3DownloadObjects("uploads/"+file);
   res.send((await r).Body);
});

// app.get('/upload',function(req,res){

// })
app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html")
})
app.listen(8080, () => console.log("listening to local host"));