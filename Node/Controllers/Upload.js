multer = require("multer");
path = require("path");
fs = require("fs");
const DIR = path.join(path.dirname(require.main.filename), "public");
var upload = multer({ dest: path.join(DIR, "Temp") }).single("file");
var router = require("express").Router();

module.exports = function (arrg) {
    var { Users } = arrg.models;

    router.post("/upload", (req, res, next) => {
        upload(req, res, (err) => {
            var { email } = req.body;
            var filetype = req.file.mimetype.split('/').pop();
            if (err) {
                return res.status(422).send({ header: "Error", content: "Uploading Failed" });
            }
            if (filetype == 'jpeg' || filetype == "jpg" || filetype == "png") {
                Users.findOne({ email }).then(user => {
                    let file_oldName = req.file.path;
                    let file_newName = path.join(DIR + "/user_image/" + user.email + '.jpg');
                    fs.rename(file_oldName, file_newName, (err) => {
                        if (err) {
                            return res.status(422).send({ header: "Error", content: "No Path Found" });
                        }
                        profileImage = user.email + ".jpg";
                        Users.findOneAndUpdate({ email },{profileImage}).then(data=>{
                            console.log('updates')
                        }).catch(err=>{
                            console.log(err.stack)
                        });
                        return;
                    });
                }).catch(() => {
                    return res.status(422).send({ header: "Error", content: "No Data" });
                });
            }
            else {
                return res.status(422).send({ header: "Error", content: "Invalid type Uploaded" });
            }
        });
    });
    return router;
};