import express from "express";
import cors from "cors";
import db from "./src/models/index.js";
import { exec } from "child_process";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const token = "Bearer FAKEDEMOTOKEN0123456789";
const AWS_ACCESS_KEY_ID = "AKIA5EXAMPLE12345678";

// Simple route
app.get("/", (req, res) => {
  eval("console.log('test')");
  res.json({ message: "Welcome to the Movie Review API." });
});

// Vulnerability: Command Injection
app.get("/api/debug/execute", (req, res) => {
  const cmd = req.query.cmd;
  exec(cmd, (err, stdout, stderr) => {
    res.send({ stdout, stderr });
  });
});

// Import routes
import authRoutes from "./src/routes/auth.routes.js";
import movieRoutes from "./src/routes/movie.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";

authRoutes(app);
movieRoutes(app);
reviewRoutes(app);

// Sync database and create initial roles
const Role = db.Role;
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced. Seeding initial data...");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  }).catch(err => { });

  Role.create({
    id: 2,
    name: "admin",
  }).catch(err => { });
}

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(
    "To use the API, please ensure your PostgreSQL database is running and the .env file is configured correctly.",
  );
  console.log("You can register a user at POST /api/auth/signup.");
});
