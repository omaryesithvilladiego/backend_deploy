const mongoose = require('mongoose');
require("dotenv").config();

exports.mongoConnect = () => {
 mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log("connected to mongodb Atlas"))
 .catch((error) => console.log(error) )
}

mongoose.connection.on("open", _ => {
    console.log("database is connected")

})
