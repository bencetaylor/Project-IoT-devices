const http = require('http');
const logService = require('../middlewares/logService')

function sendGetRequest(address) {
    http.get({ path: '/data', hostname: address.ip, port: address.port }, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
            const recievedData = JSON.parse(data)
            logService.createLog(recievedData.id, recievedData.data)
        })
    }).on('error', (err) => {
        console.error('http communication error: ' + err)
    })
};

module.exports = {
    sendGetRequest: (address) => sendGetRequest(address)
}
