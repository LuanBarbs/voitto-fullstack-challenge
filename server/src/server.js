import express from "express";          // Importação do framework Express para criação do servidor.   
import cors from "cors";                // Importação do CORS para fazer requsições de vérias origens.

import coursesRoutes from "./routes/coursesRoutes.js";          // Importação das rotas de cursos.
import enrollmentsRouter from "./routes/enrrolmentsRoutes.js";  // Importação das rotas de matrículas

const app = express();                  // Cria a instância do aplicativo Express.
const PORT = 8080;

app.use(cors()); 
app.use(express.json());
app.use("/cursos", coursesRoutes);
app.use("/matriculas", enrollmentsRouter);

// Inicia o servidor.
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});