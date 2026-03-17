const express = require("express");
const cors = require("cors");
const db = require("./src/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Movie Review API." });
});

// Import routes
require("./src/routes/auth.routes")(app);
require("./src/routes/movie.routes")(app);
require("./src/routes/review.routes")(app);

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
  });

  Role.create({
    id: 2,
    name: "admin",
  });
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
