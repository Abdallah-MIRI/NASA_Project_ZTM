const express = require("express");
const launchesRouter = express.Router();

const { httpGetLaunches } = require("./launches.controller");

launchesRouter.get("/upcoming", httpGetLaunches);

module.exports = launchesRouter;
