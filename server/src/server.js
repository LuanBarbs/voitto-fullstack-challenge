const express = require("express");     // Importação do framework Express para criação do servidor.
const cors = require("cors");           // Importação do CORS para fazer requsições de vérias origens. 

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