const { getAllLaunches } = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  // for (const value of launches.values()) { ... }
  return res.status(200).json(getAllLaunches());
}

module.exports = { httpGetLaunches };
