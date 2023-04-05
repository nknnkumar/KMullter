const multer = require('multer');
//const upload = multer({ dest: 'uploads/' })

const express = require('express');
const http = require('http');
const app = express();
var path = require('path');
const server = http.createServer(app);
let fs = require("fs");

var port = normalizePort(process.env.PORT || '4116');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images");
    },
    filename: function (req, file, cb) {
        console.log("req : ", req.KeshavSoft, file);
        //  let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        //cb(null, Date.now() + ext);
        //  cb(null, Date.now() + path.extname(file.originalname));
        //cb(null, req.body.nspeakers + path.extname(file.originalname));

        cb(null, req.KeshavSoft + path.extname(file.originalname));

    }
})

var upload = multer({ storage: storage });

let kmiddle = (req, res, next) => {
    req.KeshavSoft = "Keshav";
    next();
};
const convert = (imgPath) => {
    // read image file
    fs.readFile(imgPath, (err, data) => {
        // error handle
        if (err) {
            throw err;
        }

        // get image file extension name
        const extensionName = path.extname(imgPath);

        // convert image file to base64-encoded string
        const base64Image = Buffer.from(data, 'binary').toString('base64');

        // combine all strings
        const base64ImageStr = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;

        console.log("base64ImageStr : ", base64ImageStr);
    })
}

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + `/upload.html`));
});
app.get('/file', function (req, res, next) {
    res.sendFile(path.join(__dirname + `/uploads/54ba0a63f9dc9b0640d28c126cc36ba6`));
});

app.get('/file1', function (req, res, next) {
    res.sendFile(path.join(__dirname + `/Images/1680285347210.jpg`));
});

app.get('/file2', async (req, res, next) => {
    console.log("aaaaaaaaaaa");
    convert(`Images/1680285347210.jpg`);
    //res.sendFile(fs.readFileSync(`Images/1680285347210.jpg`, { encoding: 'base64' }));
});

app.post('/stats', kmiddle, upload.single("uploaded_file"), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    // console.log(req.file, req.body)
    res.end("success");
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});