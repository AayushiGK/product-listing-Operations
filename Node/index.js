const config = require("./Config/config");
var models = require("./mongodb/schema")().model;
var arrg = {
    models,
    config
}
var { morgan, logger } = require("./logger/index")(arrg);
arrg.morgan = morgan;
arrg.logger = logger;
require('./Controllers/controllers')(arrg);