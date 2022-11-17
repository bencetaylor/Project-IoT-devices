module.exports = {
    getLogs: () => getLogs(),
    createLog: (id, data) => createLog(id, data)
}

const Log = require('../models/logModel')

function getLogs() {
    return Log.find()
}

function createLog(id, data) {
    const log = new Log({
        device_id: id,
        data: data,
        timestamp: Date.now()
    })
    log.save()
      .then((result) => {
        console.log('Log saved: ' + result)
    })
      .catch((err) => {
        console.log(err);
    })
}