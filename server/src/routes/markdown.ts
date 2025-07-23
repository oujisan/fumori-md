import express from "express";
import { getAllMarkdowns, getMarkdown } from "../services/github";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const data = await getAllMarkdowns();
    res.json(data);
  } catch (err) {
    console.error("Error in /api/notes:", err);
    res.status(500).json({ message: "Gagal mengambil daftar markdown." });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const content = await getMarkdown(slug);
    res.json({ content });
  } catch (err) {
    console.error("Error in /api/notes/:slug:", err);
    res.status(500).json({ message: "Gagal mengambil isi markdown." });
  }
});

export default router;