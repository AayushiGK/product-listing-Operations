var router = require("express").Router();
path = require("path");
module.exports = function (arrg) {
    var { Users } = arrg.models;

    router.get("/getUsers", (req, res, next) => {
        Users.find().exec(function (err, Users) {
            if (err) {
                return res.status(422).send({ header: "Error", content: err.stack });
            } else {
                return res.send({ data: Users });
            }
        });
    });


    router.get("/getSingleUser", (req, res, next) => {
        console.log('req.params', req.query.email)
        Users.findOne({ email: req.query.email }).exec(function (err, user) {
            if (err) {
                return res.status(422).send({ header: "Error", content: err.stack });
            } else {
                return res.send({ data: user });
            }
        });
    });


    router.post("/addEditUser", (req, res, next) => {
        const isNew = req.query.isNew == "true";
        var { firstName, lastName, email, contact, profileImage } = req.body;
        console.log(req.body)
        if (isNew) {
            Users.findOneAndUpdate({ email }, { firstName, lastName, contact, profileImage, isDeleted: '0' }, { upsert: true }).then(user => {
                return res.status(200).send({ header: "Success", content: "Added" });
            }).catch(err => {
                return res.status(422).send({ header: "Error", content: "Adding failed" });
            })
        }

        else if (!isNew) {
            Users.updateOne({ email }, { $set: { firstName, lastName, contact } }).then((data) => {
                console.log('data', data)
                return res.status(200).send({ header: "Success", content: "User updated" })
            }).catch(err => {
                return res.status(422).send({ header: "Error", content: "Updation failed" });
            });
        }
    });


    router.post("/deleteUser", (req, res, next) => {
        Users.updateOne({ email: req.body.email }, { $set: { isDeleted: "1" } }).then(() => {
            return res.status(200).send({ header: "Success", content: "Deleted" });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "Deletion Failed" });
        });
    });

    return router;
}
