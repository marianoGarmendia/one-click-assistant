import express from "express";

import cors from "cors";

import { translateRouter } from "./routes/translate.route.js";

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
app.use(translateRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`);
});
