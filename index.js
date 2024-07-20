import express from "express";

import cors from "cors";

import { assistantRouter } from "./routes/assistant.route.js";

const PORT = process.env.PORT || 3000;

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.text());
app.use(assistantRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`);
});
