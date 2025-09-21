const axios = require("axios");
const LauncheDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;
let SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

const launch = {
  flightNumber: 100,
  mission: "Kepler Explorion 01",
  rocket: "explorer is1",
  launchDate: new Date("August 27, 2040").toDateString(),
  target: "Kepler-442 b",
  customer: ["ztm", "Nasa"],
  upcoming: true,
  success: true,
};

saveLanche(launch);

// launches.set(launch.flightNumber, launch);
// console.log(launches);

async function loadLaunchData() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          name: 1,
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers: customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);
  }

  return;
}

async function existsLaunchWithId(launchId) {
  return await LauncheDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await LauncheDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  // console.log(latestLaunch.flightNumber);

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await LauncheDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLanche(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await LauncheDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function schedulNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    customer: ["AMA", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  });

  await saveLanche(newLaunch);
}

async function abortLaunchById(launchId) {
  // const aborted = launches.get(launchId);
  const abortedMongo = await LauncheDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  // aborted.upcoming = false;
  // aborted.success = false;
  // return abortedMongo;
  // return abortedMongo.ok === 1 && abortedMongo.nModified === 1;
  return abortedMongo;
}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  schedulNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
  saveLanche,
  getLatestFlightNumber,
};
