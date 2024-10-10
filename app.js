// Import necessary dependencies
import "dotenv/config";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { client } from "./config/prismicConfig.js";
import * as prismicH from "@prismicio/helpers";
import logger from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import errorHandler from "errorhandler";

// Routes
import homeRouter from "./routes/home.js";
import aboutRouter from "./routes/about.js";
import collectionsRouter from "./routes/collections.js";
import productRouter from "./routes/product.js";

// Initialize Express app
const app = express();

// Logger middleware for request logging
app.use(logger("dev"));

// Body parsing middleware for handling JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Method Override middleware to support legacy forms with PUT/DELETE
app.use(methodOverride());

// Get the __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Link resolver for Prismic
const linkResolver = (doc) => {
  if (doc.type === "product") {
    return `/product/${doc.slug}`;
  }
  if (doc.type === "about") {
    return "/about";
  }
  if (doc.type === "collections") {
    return "/collections";
  }
  // Logging for debugging, remove in production
  if (process.env.NODE_ENV === "development") {
    console.log(doc);
  }
  return "/";
};

// Middleware to inject Prismic client and helpers into locals for every route
app.use((req, res, next) => {
  res.locals.ctx = {
    client, // Prismic client
    prismicH, // Prismic helpers
  };
  res.locals.Link = linkResolver;
  next();
});

// Use the routes
app.use("/", homeRouter);
app.use("/", aboutRouter);
app.use("/", collectionsRouter);
app.use("/", productRouter);

// Error handling middleware, only in development mode
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
