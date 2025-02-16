import sqlite3 from "sqlite3";     // Importação do sqlite3 para criar um novo banco de dados SQLite.

// Criar uma instância do banco.
const db = new sqlite3.Database("database.db", (error) => {
    if (error) {
        console.error(`Erro ao conectar com o banco de dados: ${error.message}`);
    } else {
        console.log("Banco de dados conectado!");
    }
});

// Cria as tabelas se não existirem.
db.serialize(() => {
    // Cria a tabela cursos.
    db.run(`CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        workload INTEGER NOT NULL
    )`);

    // Cria a tabela matrículas.
    db.run(`CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        studant_name TEXT NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )`);
});

export default db;