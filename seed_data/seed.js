const mongoose = require("mongoose");
const Model = require("../schemas/locationSchema");
const locations = require("./data/test_data");

require("dotenv").config({
  path: "./.env",
});

const mongoStr = process.env.DATABASE_URL;

mongoose
  .connect(mongoStr)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  try {
    await Model.deleteMany({});
    for (let i = 0; i < locations.length; i++) {
      locations[i]["_id"] = i + 1;
      await Model.insertMany(locations[i]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedDB;
