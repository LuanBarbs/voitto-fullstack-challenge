import express from "express";

import { insertEnrollment, getEnrollmentsByCourse } from "../controllers/enrollmentsController.js";

const enrollmentsRouter = express.Router();

// Criando as rotas para as operações de matrículas.
enrollmentsRouter.post("/", insertEnrollment);
enrollmentsRouter.get("/:courseId", getEnrollmentsByCourse);

export default enrollmentsRouter;