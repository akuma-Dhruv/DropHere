require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { s3Uploadv2, s3Listobjects, s3DeleteObjects, s3DownloadObjects } = require("./s3");
const app = express();
const port=process.env.PORT|| 8080;
app.set('view engine', 'ejs');
app.use("/public", express.static('public')); 

//******* delete ot after use */

var listResponse = '';



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
  limits: { fileSize: 10000000000, files: 5 }
});
// const upload = multer({ "/uploads" });

app.post("/upload", upload.array("file"), async (req, res) => {
  const token = Math.floor(Math.random() * 900000) + 100000;
  const result = await s3Uploadv2(req.files, token);
  // res.json({ status: "success", result, Token: token });
  res.render("upload",{token});
  console.log(token);
});


app.get("/list", async (req, res) => {


  let token = req.query.token;
  if(parseInt(token)>=100000)
  { 
    let r = await s3Listobjects(token);
    listResponse = r;
    // console.log(r);
    let x = r.Contents.map(item => item.Key);
    // console.log(typeof (x));
    // console.log(x);
    res.render("list", { x });
  }
});
app.get("/delete", async (req, res) => {

  let token = req.query.token;
  s3DeleteObjects(token);
});
app.get("/download/:ft/:fn", async (req, res) => {
  //console.log(listResponse );
  let fileName = req.params.ft;
  fileName += "/";
  fileName += req.params.fn;
  let r = s3DownloadObjects(fileName);

  res.send((await r).Body);
});
//removee after use


 app.get('/upload',function(req,res){
  let token=0;
  res.render("upload",{token})
 })
app.get('/', function (req, res) {

  // res.sendFile(__dirname + "/index.html")
  res.render("index");
})
app.listen(port, () => console.log("listening to local host"));