const launches = new Map();

const launche = {
  flightNumber: 100,
  mission: "Kepler Explorion 01",
  rocket: "explorer is1",
  launchDate: new Date("Decmber 27", "2040"),
  destination: "Kepler-442 b",
  customer: ["ztm", "Nasa"],
  upcoming: true,
  success: true,
};

launches.set(launche.flightNumber, launche);
// console.log(launches);

function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
};
