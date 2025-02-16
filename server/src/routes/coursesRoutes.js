import express from "express";

import { insertCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/coursesController.js";

const coursesRoutes = express.Router();

// Criando as rotas para as operações de cursos.
coursesRoutes.post("/", insertCourse);
coursesRoutes.get("/", getAllCourses);
coursesRoutes.get("/:id", getCourseById);
coursesRoutes.put("/:id", updateCourse);
coursesRoutes.delete("/:id", deleteCourse);

export default coursesRoutes;