import express from "express";
import * as prismicH from "@prismicio/helpers";
import { client } from "../config/prismicConfig.js";

const router = express.Router();

router.get("/about", async (req, res) => {
  try {
    // Fetch the 'home' and 'meta' documents simultaneously using Promise.all
    const [document, metaDocument, navigation, preloader] = await Promise.all([
      client.getSingle("about"), // Fetch 'home' document
      client.getSingle("meta"), // Fetch 'meta' document
      client.getSingle("navigation"), // Fetch 'navigation' document
      client.getSingle("preloader"),
    ]);

    // If the documents don't exist, provide fallback values
    if (!document || !metaDocument || !navigation || !preloader) {
      throw new Error("Missing document");
    }

    // Define meta information with fallback values from the 'meta' custom type
    const meta = {
      data: {
        title: metaDocument?.data.title || "Default About Title",
        description:
          metaDocument?.data.description || "Default About Description",
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        image: metaDocument?.data.image?.url || "/default-home-image.jpg",
      },
    };

    // Render the about page with document, meta, and Prismic helpers
    res.render("template", {
      meta, // Meta data for SEO
      navigation,
      content: "pages/about", // Specify the content template to include
      document, // Pass the document so it's accessible in the content
      preloader,
      prismicH, // Prismic helpers
    });
  } catch (error) {
    res.status(500).send("Error loading about page");
  }
});

export default router;
