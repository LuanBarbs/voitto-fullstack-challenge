import express from "express";          // Importação do framework Express para criação do servidor.   
import cors from "cors";                // Importação do CORS para fazer requsições de vérias origens.

import { openDB } from "./database.js";    // Importação da função que inicia o banco de dados.

// Cria ou conecta com o banco de dados.
openDB();

const app = express();                  // Cria a instância do aplicativo Express.
const PORT = 8080;

app.use(cors()); 

// Rota GET na raiz "/".
app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

// Inicia o servidor.
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});