const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db_latihan");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nama tidak boleh kosong"],
  },
  age: {
    type: Number,
    required: [true, "umur tidak boleh kosong"],
  },
  status: {
    type: String,
    enum: ["active", "non active"],
    default: "non active",
  },
});

const User = mongoose.model("User", userSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", async () => {
  //   const user = await User.find();
  //   console.log(user);

  const createUser = await User.create({
    name: "tio",
    age: 22,
  });
  console.log(createUser);

//   const updateUser = await User.updateOne(
//     { _id: "622af2970c30bd578b34ade1" },
//     {
//       name: "tio",
//       age: 22,
//     }
//   );
//   console.log(updateUser);

  //   const deleteUser = await User.deleteOne({ _id: "622af07b4b6567207e87f460" });
  //   console.log(deleteUser);
});
