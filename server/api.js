const express = require('express')
const router = express.Router()
// function for cron jobs
const cron = require('node-cron');

const CLIENTS_ONLINE = [];

// rest communication module request handler
const httpComm = require('./middlewares/httpComm')

// data services
const deviceService = require('./middlewares/deviceService.js')

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', (req, res) => {
    res.send('API home page')
})
// define the about route
router.get('/about', (req, res) => {
    res.send('API about')
})

router.route('/:id')
    .get((req, res) => {
        console.log(+req.params.id)
        // TODO call service 
        const device = CLIENTS_ONLINE.filter(device => device.id === +req.params.id)[0]
        res.json(device)
    })

router.post('/register', (req, res) => {
        const clientData = req.body
        CLIENTS_ONLINE.push(clientData)
        deviceService.logData(1, clientData)

        res.json({
            register: 'success'
        });
    })

/**
 * Cron job to poll the online clients
 * Poll rate - 10s
 */
cron.schedule("*/10 * * * * *", function () {
    CLIENTS_ONLINE.forEach(client => {
        deviceService.logData(client.id, client)
        httpComm.sendGetRequest()
    })
});

module.exports = router