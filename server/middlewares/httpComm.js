const http = require('http');

function sendGetRequest() {
    console.log('send request')
    http.get({ path: '/data', hostname: 'localhost', port: 3001 }, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => { console.log(data) })
    })
};

module.exports = {
    sendGetRequest: () => sendGetRequest()
}
