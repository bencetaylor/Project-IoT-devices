/**
 * Model for logging device activity
 */
 const mongoose = require('mongoose');

 const logSchema = new mongoose.Schema({
    device_ip: {
        type: String,
    },
    method: {
        type: String,
    },
    host: {
        type: String,
    },
    path: {
        type: String,
    },
    msg: {
        type: String,
    },
 }, {timestamps: true});
 
 const Log = mongoose.model('Log', logSchema);
 module.exports = Log;