/**
 * Model for logging device activity
 */
 const mongoose = require('mongoose');

 const logSchema = new mongoose.Schema({
    device_id: {
        type: String,
    },
    deviceName: {
        type: String,
    },
    method: {
        type: String,
    },
    path: {
        type: String,
    },
 }, {timestamps: true});
 
 const Log = mongoose.model('Log', logSchema);
 module.exports = Log;