module.exports = function (io) {

  const express = require('express');
  const DeviceService = require('../middlewares/deviceService')
  const router = express.Router();


  router.get('/', (req, res) => {
    DeviceService.getDevices()
      .then((result) => {
        res.render('index', { title: 'All devices', devices: result })
      })
      .catch((err) => {
        console.error(err);
      })
  });

  router.get('/create', (req, res) => {
    res.render('create', { title: 'Add a new device' });
  });

  router.post('/', (req, res) => {
    const data = req.body
    console.log(data)

    DeviceService.createDevice(data)
      .then(result => {
        res.redirect('/devices/' + result._id)
      })
      .catch(err => {
        console.error(err)
      })
  });


  router.get('/:id', (req, res) => {
    const id = req.params.id;
    DeviceService.getDevice(id)
      .then((result) => {
        res.render('device/details', { title: 'Device Details', device: result })
      })
      .catch(err => {
        console.error(err);
      });
  })

  router.get('/socket/send', (req, res) => {
    io.emit('msg', 'Ask for data')
    res.send('OK')
  })

  return router
};

