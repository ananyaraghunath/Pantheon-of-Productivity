const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for Muses music
app.get("/api/music", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "pantheon-backend",
    "data",
    "muses-music.json",
  );
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Server Error");
    }

    try {
      const musicData = JSON.parse(data);
      res.json(musicData);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      res.status(500).send("Invalid JSON format");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Muses backend running on http://localhost:${PORT}`);
});
