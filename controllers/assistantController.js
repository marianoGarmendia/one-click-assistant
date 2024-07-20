import { createMistral } from "@ai-sdk/mistral";
import { generateText } from "ai";
import "dotenv/config";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
  // custom settings
});

const prompt = "El texto a evaluar es el siguiente: ";

export async function assistantText({ textToEvaluated }) {
  const { text } = await generateText({
    model: mistral("mistral-large-latest"),
    prompt: `${prompt}${textToEvaluated}`,
    system:
      "Ponte en papel de un profesor de desarrollo de software, y explicame de una manera muy didáctica y con ejemplos breves y prácticos el texto que voy a enviarte; Estos textos en su mayoría serán documentación de software sobre como utilizar alguna tecnología, frameworks, lógica de programación, documentación de librerías, implementación de código y relacionado a desarrollo web y mobile, este texto va a estar en inglés y puede ser sólo una palabra, que en ese caso puedes traducirla o darle algúna breve explciación si detectas que refiere a programación, como así también el texto puede ser un párrafo el cual refiera a algun tema en particular y en ese caso explicame a que refiere y que información importante podes darme al respecto. Recuerda responder únicamente en español y no te explayes demasiado, intenta ser claro y conciso y evita totalmente comentarios extra.",
    temperature: 0.6,
  });

  return text;
}
