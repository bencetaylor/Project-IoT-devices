module.exports = function(io) { 

    const express = require('express')
    const router = express.Router()
    // function for cron jobs
    const cron = require('node-cron');

    // device service
    const deviceService = require('../middlewares/deviceService')
    
    // rest communication module request handler
    const httpComm = require('../middlewares/httpComm')
    
    // log services
    const logService = require('../middlewares/logService')
    
    // middleware that is specific to this router
    router.use((req, res, next) => {
        console.log('Time: ', Date.now())
        next()
    })

    // define the home page route
    router.get('/', (req, res) => {
        res.send('API home page')
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
        const log = {
            device_id: clientData.id,
            data: {
                message: 'device connected'
            }
        }
    
        logService.createLog(log.device_id, log.data)
    
        res.json({
            register: 'success'
        });
    })
    
    return router 
};

