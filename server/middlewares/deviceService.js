module.exports = {
    getDevice: (id) => getDevice(id),
    getDevices: () => getDevices(),
    getDevicesByCommunication: (comm) => getDevicesByCommunication(comm),
    createDevice: (data) => createDevice(data)
};

const Log = require('../models/logModel')
const Device = require('../models/deviceModel')

function getDevices() {
    return Device.find();
}

function getDevice(id) {
    return Device.findById(id);
}

function createDevice(data) {
    const device = new Device({
        device_name: data.name,
        type: {
            type_name: data.type
        },
        device_address: {
            ip: data.ip_address,
            port: data.port
        },
        connection: data.connection
    })
    return device.save()
}

function getDevice(id) {
    return Device.findById(id);
}

function getDevicesByCommunication(comm) {
    return Device.find({connection: comm})
}