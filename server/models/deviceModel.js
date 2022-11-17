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

const deviceTypeSchema = new mongoose.Schema({
    type_name: {
        type: String,
        required: [true, 'Name is required for device type!']
    }
})

const addressSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: [true, 'IP address must have ip']
    },
    port: {
        type: Number,
        required: [false]
    }
})

const deviceSchema = new mongoose.Schema({
    device_name: {
        type: String,
        required: [true, 'Device must have a name!'],
        trim: true,
        maxLength: [100, 'A device name must have less or equal than a 100 characters!'],
        minLength: [1, 'A device name must be at least a character!'],
    },
    device_address: {
        type: addressSchema,
        required: [true, 'Device must have an IP adress!'],
    },
    type: {
        type: deviceTypeSchema,
        required: [true, 'Device must have a type']
    },
    connection: {
        type: String,
        required: [true, 'Device must have a connection type']
    }
}, {timestamps: true});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

////