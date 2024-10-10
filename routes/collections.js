import express from "express";
import * as prismicH from "@prismicio/helpers";
import { client } from "../config/prismicConfig.js";

const router = express.Router();

router.get("/collections", async (req, res) => {
  try {
    // Fetch the 'home' and 'meta' documents simultaneously using Promise.all
    const [document, metaDocument, navigation, preloader, homePage] =
      await Promise.all([
        client.getAllByType("collection", {
          fetchLinks: "product.image",
        }), // Fetch 'collection' document
        client.getSingle("meta"), // Fetch 'meta' document
        client.getSingle("navigation"), // Fetch 'meta' document
        client.getSingle("preloader"),
        client.getSingle("home"), // Fetch 'home' document
      ]);

    // If the documents don't exist, provide fallback values
    if (!document || !metaDocument || !navigation || !preloader || !homePage) {
      throw new Error("Missing document");
    }

    // Define meta information with fallback values from the 'meta' custom type
    const meta = {
      data: {
        title: metaDocument?.data.title || "Default Collections Title",
        description:
          metaDocument?.data.description || "Default Collections Description",
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        image: metaDocument?.data.image?.url || "/default-home-image.jpg",
      },
    };

    // Render the about page with document, meta, and Prismic helpers
    res.render("template", {
      meta, // Meta data for SEO
      navigation,
      content: "pages/collections", // Specify the content template to include
      document, // Pass the document so it's accessible in the content
      homePage,
      preloader,
      prismicH, // Prismic helpers
    });
  } catch (error) {
    res.status(500).send("Error loading collections page");
  }
});

export default router;
