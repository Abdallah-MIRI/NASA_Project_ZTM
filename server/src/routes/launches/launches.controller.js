const {
  getAllLaunches,
  schedulNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
  saveLanche,
} = require("../../models/launches.model");

async function httpGetLaunches(req, res) {
  // for (const value of launches.values()) { ... }
  return res.status(200).json(await getAllLaunches());
}

async function httpNewLaunches(req, res) {
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

  await schedulNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunches(req, res) {
  const launchId = Number(req.params.id);

  // if launch doesn't exist ❌
  const existLaunch = await existsLaunchWithId(launchId);
  if (!existLaunch) {
    return res.status(400).json({
      error: "lanch not found",
    });
  }

  // if launch is exist ✔
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = { httpGetLaunches, httpNewLaunches, httpAbortLaunches };
