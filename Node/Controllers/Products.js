var router = require("express").Router();
path = require("path");
module.exports = function (arrg) {
    var { Products } = arrg.models;

    router.get("/getCategories", (req, res, next) => {
        Products.find().distinct("p_category").exec(function (err, productCategories) {
            if (err) {
                return res.status(422).send({ header: "Error", content: err.stack });
            } else {
                return res.send({ data: productCategories });
            }
        });
    });


    router.post("/addProduct", (req, res, next) => {
        console.log(req.body);
        var { product_name, product_description, product_meta, product_url, product_category, product_price } = req.body;
        product = new Products({
            p_name: product_name,
            p_description: product_description,
            p_metaInfo: product_meta,
            p_image: product_url,
            p_category: product_category,
            p_price: product_price
        })
        product.save().then(product => {
            return res.status(200).send({ header: "Success", content: "Updates" });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "Updation Failed" });
        })
    });


    router.get("/getProducts", (req, res, next) => {
        Products.find({ "p_category": req.query.filter }).exec(function (err, products) {
            if (err) {
                return res.status(422).send({ header: "Error", content: err.stack });
            } else {
                return res.send({ data: products });
            }
        });
    });


    router.post("/deleteProduct", (req, res, next) => {
        console.log("delete -------------", req.body)
        Products.deleteOne({ _id: req.body._id }).then(() => {
            return res.status(200).send({ header: "Success", content: "Deleted" });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "Deletion Failed" });
        });
    });

    router.get("/getProduct", (req, res, next) => {
        console.log('req.query', req.query)
        Products.findOne({ "p_name": req.query.p_name, "p_category": req.query.p_category }).exec(function (err, product) {
            if (err) {
                return res.status(422).send({ header: "Error", content: err.stack });
            } else {
                return res.send({ data: product });
            }
        });
    });

    router.post("/updateProduct", (req, res, next) => {
        console.log(req.body);
        Products.findOneAndUpdate({ _id: req.query.product_id }, {}).then(() => {
            return res.status(200).send({ header: "Success", content: "Updates" });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "Updation Failed" });
        });
    });

    return router;
}
