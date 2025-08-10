const express = require("express");
const launchesRouter = express.Router();

const { getLaunchesController } = require("./launches.controller");

launchesRouter.get("/upcoming", getLaunchesController);

module.exports = launchesRouter;
