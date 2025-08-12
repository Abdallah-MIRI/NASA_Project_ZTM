const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  // for (const value of launches.values()) { ... }
  return res.status(200).json(getAllLaunches());
}

function httpNewLaunches(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch proprty",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid Launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunches(req, res) {
  const launchId = Number(req.params.id);

  // if launch doesn't exist ❌
  if (!existsLaunchWithId(launchId)) {
    return res.status(400).json({
      error: "lanch not found",
    });
  }

  // if launch is exist ✔
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = { httpGetLaunches, httpNewLaunches, httpAbortLaunches };
