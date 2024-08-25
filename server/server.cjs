// server.cjs (Node.js backend)
const express = require('express');
const cors = require('cors');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const app = express();
const port = 3000;

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY; // Lê a chave da API do arquivo .env
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

app.post('/sendMessageToGemini', async (req, res) => {
  try {
    console.log("Recebendo solicitação para sendMessageToGemini...");
    const { conversations } = req.body;
    console.log("Conversations recebidas:", conversations);

    const files = [
      await uploadToGemini("./server/datasets/Base Chamados_V1.csv", "text/csv"),
      await uploadToGemini("./server/datasets/Base de Respostas.csv", "text/csv"),
    ];

    await waitForFilesActive(files);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "A partir dos dados dos arquivos gerar respostas às perguntas.",
    });

    const history = conversations.map(conv => ({
      role: conv.user === "Você" ? "user" : "model",
      parts: [
        {
          text: conv.message
        }
      ]
    }));

    console.log("Histórico formatado:", history);

    history.unshift({
      role: "user",
      parts: [
        {
          fileData: {
            mimeType: files[0].mimeType,
            fileUri: files[0].uri,
          },
        },
        {
          fileData: {
            mimeType: files[1].mimeType,
            fileUri: files[1].uri,
          },
        },
        { text: "Analise e compreenda os dados fornecidos acima, identificando padrões, tendências e possíveis insights. Após a análise, espere por perguntas e responda sempre tentando buscar primeiro os dados dos arquivos para formular a resposta. Responda somente a pergunta." }
      ]
    });

    console.log("Iniciando chat session...");
    const chatSession = model.startChat({
      history,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    });

    console.log("Enviando mensagem ao modelo...");
    const result = await chatSession.sendMessage(conversations[conversations.length - 1].message);
    console.log("Resposta recebida do modelo:", result.response.text());
    
    res.json({ response: result.response.text() });

  } catch (error) {
    console.error("Erro no sendMessageToGemini:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
