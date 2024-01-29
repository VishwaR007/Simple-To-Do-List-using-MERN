// const express = require("express");
const express = require("express");
const connectDb = require("./dataBase/connectDBFile");
const AllLists = require("./dataBase/Models/AllList");
const path = require("path");

const app = express();

const parentDir = path.join(__dirname, "..");
app.use(express.static(parentDir));
app.use(express.json());

// Routes :
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/toDoListObjects", async (req, res) => {
  const { valueOfTitle, valueOfContent } = req.body;
  console.log(valueOfTitle);
  console.log(valueOfContent);

  const checkTitle = await AllLists.find({ title: valueOfTitle });

  console.log(checkTitle);

  if (checkTitle.length > 0) {
    console.log("Title already present");
    res.send({ statusFrombackEnd: "NOT OK" });
  } else {
    console.log("New Title");
    let newEntry = await AllLists.create({
      title: valueOfTitle,
      content: valueOfContent,
    });
    console.log(newEntry);
    res.send({ statusFrombackEnd: "OK" });
  }
});

app.get("/allListsRoute", async (req, res) => {
  const findAllLists = await AllLists.find();

  res.send({
    findAllLists: findAllLists,
  });
});

app.post("/deletItem", async (req, res) => {
  const { titleToDelete } = req.body;

  const findTitle = await AllLists.findOneAndDelete({ title: titleToDelete });

  res.send({ statusFromBackEnd: "OK" });
});

// Connect DB :
connectDb();

// Listening to port 8080 :
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
