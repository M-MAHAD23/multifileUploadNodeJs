const express = require("express");

const app = express();

const multer = require("multer");

const PORT = process.env.PORT || 5000;

const path = require('path')

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{name:'file1', maxCount: 10},{name: 'file2', maxCount: 10 }])

app.post("/uploadfile", uploadMultiple, (req, res) => {
    if(req.files){
        console.log(req.files);
        console.log("FILES HAS BEEN UPLOADED");
    }
    res.end('GET THE HELL OUTTA HERE');
  });
  

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});