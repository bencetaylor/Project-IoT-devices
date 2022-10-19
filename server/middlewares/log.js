const Log = require("../models/logModel");

/**
 * Middleware for logging device activity
 */
const log = async (req, res, next) => {
    try {

      let device_ip = req.ip;
      let method = req.method;
      let host = req.hostname;
      let path = req.path;
      let msg = req.body;

      const logModel = new Log({ device_ip, method, host, path, msg });

      try {
        await logModel.save();
      } catch (e) {
        res.status(400).send(e);
      }

      next();
    } catch (e) {
      res.status(401).send(e);
    }
  };

module.exports = log;