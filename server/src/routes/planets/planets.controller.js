const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  // const data = getAllPlanets();
  // console.log("🚀 Planets Data:", data);
  return res.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
