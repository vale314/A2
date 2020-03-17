const express = require("express");
const connectDB = require("./config/db");
const app = express();

const server = require("http").createServer(app);

const path = require("path");

process.env.UV_THREADPOOL_SIZE = 64;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false, limit: "5mb" }));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/register", require("./routes/register"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
