const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3005;

// data storage
let dataStore = [];

app.use(bodyParser.json());

// GET endpoint to retrieve data
app.get("/api/data", (req, res) => {
  res.json(dataStore);
});

// POST endpoint to add data
app.post("/api/data", (req, res) => {
  const newData = req.body;
  dataStore.push(newData);
  res.json({ message: "Data added successfully", data: newData });
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});
