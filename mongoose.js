const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db_latihan");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", async () => {
  console.log("server database connected");
});
