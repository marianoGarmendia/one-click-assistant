import { Router } from "express";
import { assistantText } from "../controllers/assistantController.js";

export const assistantRouter = Router();

assistantRouter.post("/assistant", async (req, res) => {
  const { textToEvaluated } = req.body;
  try {
    const output = await assistantText({ textToEvaluated });
    res.json({ output });
  } catch (error) {
    res.status(400).send(error);
  }
});
