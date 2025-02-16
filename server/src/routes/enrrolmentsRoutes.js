import express from "express";

const enrollmentsRouter = express.Router();

// Criando as rotas para as operações de matrículas.
enrollmentsRouter.post("/", () => {});
enrollmentsRouter.get("/:courseId", () => {});

export default enrollmentsRouter;