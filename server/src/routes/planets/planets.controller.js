const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  // const data = getAllPlanets();
  // console.log("🚀 Planets Data:", data);
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
