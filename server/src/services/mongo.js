const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once("open", () => {
  console.log("MongoDB Connection ready");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose
    .connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => console.log(err.reason));
}

async function mongoDisConnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisConnect };
