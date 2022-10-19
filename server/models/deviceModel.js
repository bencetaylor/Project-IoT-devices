/**
 * Model for the IoT devices
 */
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, 'Value is required for an event!'],
        trim: true
    },
    when: {
        type: Date,
        default: Date.now
    }
});

const deviceSchema = new mongoose.Schema({
    device_name: {
        type: String,
        required: [true, 'Device must have a name!'],
        trim: true,
        maxLength: [100, 'A device name must have less or equal than a 100 characters!'],
        minLength: [1, 'A device name must be at least a character!'],
    },
    device_ip: {
        type: String,
        required: [true, 'Device must have an IP adress!'],
    },
    event: {
        type: eventSchema,
        required: [true, 'Device must provide an event!']
    }
}, {timestamps: true});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;