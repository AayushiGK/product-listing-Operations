
module.exports = function () {
  
  const { db } = require('../Config/config');
  var mongoose = require("mongoose");

  mongoose.connect(db.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
  var dbconnection = mongoose.connection;

  dbconnection.once("open", () => {
    console.log('------connected to db------')
  });

  dbconnection.on("error", console.error.bind(console, 'db connection error:'));
  mongoose.set('useFindAndModify', false);

  return mongoose;
}

