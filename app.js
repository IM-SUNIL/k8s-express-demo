const express = require("express");
const os = require("os");
const { Pool } = require("pg");


const app = express();
app.use(express.json());
const pool = new Pool({
  host: "postgres-service",
  port: 5432,
  database: "appdb",
  user: "admin",
  password: "password123",
});

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
    version: "v3",
    timestamp: new Date().toISOString()
  });
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});