import db from "../database.js"; // Importa o banco de dados.

// Função que insere uma nova matrícula no banco.
export async function insertEnrollment(req, res) {
    const enrollment = req.body;

    if(!enrollment.course_id || !enrollment.student_name) {
        return res.status(400).json({
            error: "ID do curso e nome do aluno são obrigatórios."
        });
    }

    db.run("INSERT INTO enrollments (course_id, student_name) VALUES (?, ?)",
        [enrollment.course_id, enrollment.student_name],
        (error) => {
            if (error) return res.status(500).json({ error: error.message });

            res.status(201).json({ message: "Curso inserido com sucesso!" });
        }
    );
};

// Função que lista alunos matriculados em um curso. 
export async function getEnrollmentsByCourse(req, res) {
    const { courseId } = req.params;

    db.all("SELECT * FROM enrollments WHERE course_id = ?", [courseId], (error, rows) => {
        if (error) return res.status(500).json({ error: error.message });

        res.json(rows);
    });
};