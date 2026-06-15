const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Kubernetes V2 🚀",
    hostname: os.hostname(),
    version: "v2"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    hostname: os.hostname(),
    version: "v2",
    timestamp: new Date().toISOString()
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});