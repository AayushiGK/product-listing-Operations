const config = require("./Config/config");
var models = require("./mongodb/schema")().model;
var arrg = {
    models,
    config
}
require('./Controllers/controllers')(arrg);