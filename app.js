const express = require("express");
const path = require("node:path");

const app = express();

// Template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/home", {
    meta: {
      data: {
        title: "Boilerplate js",
        description: "Boilerplate for website using plain js.",
        image: "https://metatags.io/images/meta-tags.png",
        url: "https://metatags.io/",
      },
    },
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    meta: {
      data: {
        title: "Boilerplate js",
        description: "Boilerplate for website using plain js.",
        image: "https://metatags.io/images/meta-tags.png",
        url: "https://metatags.io/",
      },
    },
  });
});

app.get("/collections", (req, res) => {
  res.render("pages/collections", {
    meta: {
      data: {
        title: "Boilerplate js",
        description: "Boilerplate for website using plain js.",
        image: "https://metatags.io/images/meta-tags.png",
        url: "https://metatags.io/",
      },
    },
  });
});

app.get("/", (req, res) => {
  res.render("details/:id", {
    meta: {
      data: {
        title: "Boilerplate js",
        description: "Boilerplate for website using plain js.",
        image: "https://metatags.io/images/meta-tags.png",
        url: "https://metatags.io/",
      },
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
