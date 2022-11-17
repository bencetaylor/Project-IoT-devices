/**
 * Model for logging device activity
 */
 const mongoose = require('mongoose');

 const logSchema = new mongoose.Schema({
    device_id: {
        type: String,
    },
    data: {
        type: Object,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
 }, {timestamps: true});
 
 const Log = mongoose.model('Log', logSchema);

 module.exports = Log;