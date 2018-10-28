/**
 * Configuración de mongoose
 */
const mongoose = require("mongoose");
let dev_db_url = 'mongodb://admin:admin123@ds149335.mlab.com:49335/control-sup-jashi';
mongoose.connect(dev_db_url,{useNewUrlParser : true});
console.log(mongoose.connection.readyState);
///2 OK ---success