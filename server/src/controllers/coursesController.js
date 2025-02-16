import db from "../database.js"; // Importa o banco de dados.

// Função que insere um novo curso no banco.
export async function insertCourse(req, res) {
    const course = req.body;

    if(!course.name || !course.workload) {
        return res.status(400).json({
            error: "Nome e carga horária são obrigatórios."
        });
    }

    db.run("INSERT INTO courses (name, description, workload) VALUES (?, ?, ?)", 
        [course.name, course.description, course.workload],
        (error) => {
            if (error) return res.status(500).json({ error: error.message });

            res.status(201).json({ message: "Curso inserido com sucesso!" });
        }
    );
};

// Função que busca todos os cursos no banco.
export async function getAllCourses(req, res) {
    db.all("SELECT * FROM courses", [], (error, rows) => {
        if (error) return res.status(500).json({ error: error.message });

        res.json(rows);
    });
};

// Função que busca um único curso pelo id passado como parâmetro.
export async function getCourseById(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM courses WHERE id = ?", [id], (error, row) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!row) return res.status(404).json({ error: "Curso não encontrado." });

        res.json(row);
    });
};

// Função que atualiza um curso no banco.
export async function updateCourse(req, res) {
    const { id } = req.params;
    const updatedCourse = req.body;

    try {
        // Busca o curso antes de atualizar.
        const course = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM courses WHERE id = ?", [id], (error, row) => {
                if (error) return reject(error);
                if (!row) return reject({ status: 404, message: "Curso não encontrado." });
                resolve(row);
            });
        });

        // Atualiza o curso com valores enviados ou mantém os antigos.
        // Permite atualizar um ou mais campo(s) de algum curso específico.
        db.run("UPDATE courses SET name = ?, description = ?, workload = ? WHERE id = ?",
            [
                updatedCourse.name ?? course.name,                  // Se name for undefined mantém o nome antigo.
                updatedCourse.description ?? course.description,    // Mesma regra se aplica ao próximos atributos. 
                updatedCourse.workload ?? course.workload,
                id
            ],
            function(error) {
                if (error) return res.status(500).json({ error: error.message });
                if (this.changes === 0) return res.status(404).json({ error: "Curso não encontrado!" });
    
                res.status(200).json({ message: "Curso atualizado com sucesso!" });
            }
        );
    } catch (error) {
        if (error.status === 404) return res.status(404).json({ error: error.message });
        return res.status(500).json({ error: error.message });
    }
};

// Função que deleta um curso no banco.
export async function deleteCourse(req, res) {
    const { id } = req.params;

    db.run("DELETE FROM courses WHERE id = ?", [id], function (error) {
        if (error) return res.status(500).json({ error: error.message });
        if (this.changes === 0) res.status(404).json({ error: "Curso não encontrado." });

        res.json({ message: "Curso excluído com sucesso!" });
    });
};