const { launches } = require("../../models/launches.model");

function getLaunchesController(req, res) {
  // for (const value of launches.values()) { ... }
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = { getLaunchesController };
