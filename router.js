const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const connection = require("./connection");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/users", async (req, res) => {
  try {
    const db = connection.db("db_latihan");
    const users = await db.collection("users").find().toArray();

    res.send({ data: users });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const db = connection.db("db_latihan");
    const users = await db.collection("users").insertOne({ name, age, status });

    res.send({ message: "berhasil ditambahkan" });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;

    const db = connection.db("db_latihan");
    const users = await db.collection("users").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          age,
          status,
        },
      }
    );

    res.send({ message: "berhasil diupdate" });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const db = connection.db("db_latihan");
    const users = await db.collection("users").deleteOne({ _id: ObjectId(id) });

    res.send({ message: "berhasil dihapus" });
  } catch (error) {
    res.send({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
