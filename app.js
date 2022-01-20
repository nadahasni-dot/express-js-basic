const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const buah = [
    { name: "Apel" },
    { name: "Melon" },
    { name: "Mangga" },
    { name: "Jeruk" },
  ];

  res.render("index", {
    name: "nada hasni",
    age: 22,
    buah,
  });
});

app.get("/:name", (req, res) => {
  res.send(`Hello ${req.params.name}! Welcome to express`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
