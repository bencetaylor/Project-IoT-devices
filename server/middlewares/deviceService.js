module.exports = {
    getDevice: (id) => getDevice(id),
    logData: (id, data) => logData(id, data)
};

function getDevice(id) {
    const obj = {
        id: 'X8AKY9XR2G',
        ip_address: 'localhost:3001',
        type: 'solar sensor'
    }

    return obj;
}

function logData(deviceID, data) {
    console.log(deviceID)
    console.log(data)
}