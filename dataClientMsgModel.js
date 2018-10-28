/**
 * Definimos tipo de datos  mensajes con datos del sistema
 * seria el equivalente de una tabla
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataClientMsgSchema = new Schema({
    client:String,
    data:[{
    dht1_temp:Number, 
    dht1_hmd:Number, 
    dht2_temp:Number, 
    dht2_hmd:Number, 
    tr1_temp:Number, 
    tr2_temp:Number, 
    core_temp:Number, 
    ac_state:Number, 
    sec_remain:Number, 
    temp_max:Number, 
    temp_min:Number, 
    adj_R1:Number, 
    adj_R2:Number, 
    TPR:Number
    }]
});

let dataClientMsg = mongoose.model('dataClientMsg',dataClientMsgSchema);
module.exports = dataClientMsg;