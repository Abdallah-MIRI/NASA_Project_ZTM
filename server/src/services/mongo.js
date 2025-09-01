const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://awavllv_db_user:aKeWY8T7pbPiskKl@nasa.4njt8jm.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa";

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
