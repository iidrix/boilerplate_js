// Import necessary dependencies
import "dotenv/config";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { client } from "./config/prismicConfig.js";
import * as prismicH from "@prismicio/helpers";

// Routes
import homeRouter from "./routes/home.js";
import aboutRouter from "./routes/about.js";
import collectionsRouter from "./routes/collections.js";

// Initialize Express app
const app = express();

// Get the __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to inject Prismic client and helpers into locals for every route
app.use((req, res, next) => {
  res.locals.ctx = {
    client, // Prismic client
    prismicH, // Prismic helpers
  };
  next();
});

// Use the routes
app.use("/", homeRouter);
app.use("/", aboutRouter);
app.use("/", collectionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).send("Something went wrong.");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
