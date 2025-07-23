import express from "express";
import { saveMarkdown, deleteMarkdown } from "../services/github";
import {checkPassword} from "../middlewares/auth";

const router = express.Router();

router.post("/", checkPassword, async (req, res) => {
  const { slug, content, sha } = req.body;
  if (!slug || !content)
    return res.status(400).json({ error: "Missing slug or content" });

  const result = await saveMarkdown(slug, content, sha);
  res.json(result);
});

router.delete("/:slug", checkPassword, async (req, res) => {
  const { slug } = req.params;
  const { sha } = req.query;

  if (!sha || typeof sha !== "string") {
    return res.status(400).json({ error: "SHA is required to delete a file." });
  }

  try {
    await deleteMarkdown(slug, sha);
    res
      .status(200)
      .json({ message: `File "${slug}" has been successfully deleted.` });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.message || "Failed to delete the file." });
  }
});

export default router;