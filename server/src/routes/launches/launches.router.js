const express = require("express");
const launchesRouter = express.Router();

const {
  httpGetLaunches,
  httpNewLaunches,
  httpAbortLaunches,
} = require("./launches.controller");

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpNewLaunches);
launchesRouter.delete("/:id", httpAbortLaunches);

module.exports = launchesRouter;
