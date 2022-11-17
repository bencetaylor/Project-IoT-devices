const express = require('express');
const LogService = require('../middlewares/logService');
const router = express.Router();

router.get('/', (req, res) => {
    LogService.getLogs()
    .then((result) => {
        res.render('log', {title: 'All logs', logs: result})
    })
    .catch((err) => {
        console.error(err);
    })
});

module.exports = router;