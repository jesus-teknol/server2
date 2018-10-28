/**
 * Definimos tipo de datos para Mensajes de control
 * seria el equivalente de una tabla
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    client:String,
    controlWord:String,
    temp_max:Number, 
    temp_min:Number, 
    adj_R1:Number, 
    adj_R2:Number, 
    TPR:Number,
    controlStatus:Number
});

let Message = mongoose.model('message',messageSchema);
module.exports = Message;