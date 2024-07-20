import { Router } from "express";
import { translateText } from "../controllers/translateController.js";

export const translateRouter = Router();

translateRouter.post("/translate", async (req, res) => {
  const { textToEvaluated } = req.body;
  try {
    const output = await translateText({ textToEvaluated });
    res.json({ output });
  } catch (error) {
    res.status(400).send(error);
  }
});
