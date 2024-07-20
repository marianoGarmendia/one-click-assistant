import Replicate from "replicate";
import "dotenv/config";

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

const prompt =
  "A partir de este momento, traduce todas las palabras y frases que te pase al castellano; puedo pasarte solo palabras o breves textos como documentación de software, artículos informativos o textos aleatorios, simplemente realiza una traducción palabra por palabra, puedes interpretar dependiendo el contexto, el texto que debes responderme es solamente la traduccion al castellano de lo siguiente:";

async function translateText({ textToTranslate }) {
  const input = {
    top_k: 0,
    top_p: 0.9,
    prompt: prompt + textToTranslate,
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt:
      "A partir de este momento, traduce literalmente todas las palabras que te pase al inglés. No interpretes ni modifiques el significado, simplemente realiza una traducción palabra por palabra, el texto que debes responderme es solamente la traduccion al inglés",
    length_penalty: 1,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 1.15,
    log_performance_metrics: false,
  };

  let output = "";

  for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", {
    input,
  })) {
    output += event.toString();
    // process.stdout.write(event.toString());
  }

  return output;
}

export { translateText };
