const express = require("express");
const router = express.Router();
require("./mongoose");
const User = require("./User");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.send({ data: users });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({ _id: id });

    if (users) {
      res.send({ data: users });
    } else {
      res.send({ message: "User not found" });
    }
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const user = await User.create({ name, age, status });

    res.send({ message: "berhasil ditambahkan", data: user });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;

    const user = await User.updateOne(
      { _id: id },
      { name, age, status },
      { runValidators: true }
    );

    res.send({ message: "berhasil diupdate", data: user });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.deleteOne({ _id: id });

    res.send({ message: "berhasil dihapus", data: user });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
