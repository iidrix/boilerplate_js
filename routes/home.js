import express from "express";
import * as prismicH from "@prismicio/helpers";
import { client } from "../config/prismicConfig.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch the 'home' and 'meta' documents simultaneously using Promise.all
    const [document, metaDocument] = await Promise.all([
      client.getSingle("home"), // Fetch 'home' document
      client.getSingle("meta"), // Fetch 'meta' document
    ]);

    // If the documents don't exist, provide fallback values
    if (!document || !metaDocument) {
      throw new Error("Missing home or meta document");
    }

    // Define meta information with fallback values from the 'meta' custom type
    const meta = {
      data: {
        title: metaDocument?.data.title || "Default Home Title",
        description:
          metaDocument?.data.description || "Default Home Description",
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        image: metaDocument?.data.image?.url || "/default-home-image.jpg",
      },
    };

    // Render the home page with document, meta, and Prismic helpers
    res.render("pages/home", { document, meta, prismicH });
  } catch (error) {
    res.status(500).send("Error loading home page");
  }
});

export default router;
