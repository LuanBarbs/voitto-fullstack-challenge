import React, { useState, useEffect } from "react";

// Importação das cores básicas do tema.
import colors from "@/utils/colors";

// Página principal.
export default function Home() {
  // Declarando os básicos do componente.
  const [courses, setCourses] = useState([]);                   // Armazena a lista de cursos. 
  const [search, setSearch] = useState("");                     // Armazena o valor da busca.
  const [selectedCourse, setSelectedCourse] = useState(null);   // Armazena o curso selecionado.
  const [students, setStudents] = useState([]);                 // Armazena os alunos matriculados em determinado curso.
  const [studentName, setStudentName] = useState("");           // Armazena o nome do aluno para realizar matrícula.
  const [error, setError] = useState("");                       // Armazena erros.
  const [loading, setLoading] = useState(false);                // Controla o estado de carregamento do componente.

  // Estados para a criação de um curso.
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false); // Controla a visibilidade do formulário de criação.
  const [newCourseName, setNewCourseName] = useState(""); // Nome do curso.
  const [newCourseDescription, setNewCourseDescription] = useState(""); // Descrição do curso.
  const [newCourseWorkload, setNewCourseWorkload] = useState(""); // Carga horária do curso.

  // Função para buscar todos os cursos.
  async function fetchCourses() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/cursos");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(`Erro ao buscar cursos: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar alunos matriculados em um determinado curso.
  async function fetchStudents(courseId) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/matriculas/${courseId}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(`Erro ao buscar alunos: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Função que matricula um aluno.
  async function handleEnroll() {
    // Verifica se o nome do aluno está vazio.
    if(!studentName.trim()) {
      setError("O nome do aluno é obrigatório.");
      return;
    }

    // Verifica se o aluno já está matriculado.
    if(students.some((student) => student.student_name === studentName)) {
      setError("O aluno já está matriculado no curso.");
      return;
    }

    setLoading(true);

    // Tenta realizar a matrícula do aluno.
    try {
      console.log("AQUI");
      console.log(selectedCourse, studentName);
      const response = await fetch("http://localhost:8080/matriculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id: selectedCourse.id, student_name: studentName }),
      });

      if(!response.ok) throw new Error("Erro ao matricular aluno");

      setStudentName("");
      setError("");

      // Atualiza a lista de alunos matriculados.
      fetchStudents(selectedCourse.id);
    } catch (error) {
      console.error("Erro ao matricular aluno:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função que cria um curso.
  async function handleCreateCourse() {
    // Verifica se os atributos estão preenchidos.
    if (!newCourseName.trim() || !newCourseWorkload.trim()) {
      setError("Nome e carga horária são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/cursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCourseName,
          description: newCourseDescription,
          workload: newCourseWorkload,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar curso");

      setNewCourseName("");
      setNewCourseDescription("");
      setNewCourseWorkload("");
      setError("");
      setIsCreateCourseOpen(false);

      // Atualizar a lista de cursos após criar um novo.
      fetchCourses();
    } catch (error) {
      console.error("Erro ao criar curso:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função que deleta um curso.
  async function handleDeleteCourse(courseId) {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este curso?");
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/cursos/${courseId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir curso");

      // Atualiza a lista de cursos após a exclusão.
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para selecionar um curso e buscar os alunos.
  function handleSelectCourse(course) {
    setSelectedCourse(course);
    fetchStudents(course.id);
  };

  // Função para filtrar os cursos pelo nome.
  const filteredCourses = courses.filter((course) => 
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Busca os cursos quando o componente é montado.
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={`min-h-screen ${colors.background} p-8`}>
      <h1 className="text-3xl font-bold text-black text-center">Lista de Cursos</h1>

      <div className="flex justify-between items-center mb-4 relative">
        {/* Campo de busca */}
        <div className="my-4 w-5/6">
          <input
            type="text"
            placeholder="Buscar curso..."
            className="w-full p-2 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botão para inserir novo curso */}
        <button
          className={`${colors.primary} ${colors.primaryHover} text-white px-4 py-2 rounded-md`}
          onClick={() => setIsCreateCourseOpen((prev) => !prev)}
        >
          Inserir Curso
        </button>

        {/* Formulário de criação de curso */}
        {isCreateCourseOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 w-72 z-10">
            <h2 className="text-lg font-semibold mb-4">Criar Novo Curso</h2>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Nome do curso"
                className="w-full p-2 border rounded-md"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Descrição do curso"
                className="w-full p-2 border rounded-md"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                placeholder="Carga horária"
                className="w-full p-2 border rounded-md"
                value={newCourseWorkload}
                onChange={(e) => setNewCourseWorkload(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsCreateCourseOpen(false)}
              >
                Fechar
              </button>
              <button
                className={`${colors.primary} ${colors.primaryHover} text-white px-4 py-2 rounded-md`}
                onClick={handleCreateCourse}
              >
                Criar Curso
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabela de cursos */}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className={`${colors.primary} text-white`}>
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Descrição</th>
            <th className="p-3 text-left">Carga Horária</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-3">{course.name}</td>
              <td className="p-3">{course.description}</td>
              <td className="p-3">{course.workload}h</td>
              <td className="p-3 flex space-x-2">
                <button
                  className={`${colors.primary} ${colors.primaryHover} text-white px-3 py-1 rounded-md`}
                  onClick={() => handleSelectCourse(course)}
                >
                  Ver Alunos
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Deletar Curso
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalhes do curso selecionado */}
      {selectedCourse && (
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4 relative">
            <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
            <button 
              className={`${colors.primary} ${colors.primaryHover} text-white px-3 py-1 rounded-md`}
              onClick={() => setSelectedCourse(null)}
            >
              X
            </button>
          </div>
          <p className="text-gray-600">{selectedCourse.description}</p>

          {/* Lista de alunos matriculados */}
          <h3 className="mt-4 text-lg font-semibold">Alunos Matriculados</h3>
          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : students.length > 0 ? (
            <ul className="list-disc list-inside">
              {students.map((student) => (
                <li key={student.id}>{student.student_name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum aluno matriculado.</p>
          )}

          {/* Formulário para matrícula */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nome do aluno"
              className="w-full p-2 border rounded-md"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              className={`${colors.primary} ${colors.primaryHover} text-white px-4 py-2 rounded-md mt-2`}
              onClick={handleEnroll}
            >
              Matricular
            </button>
          </div>
        </div>
      )}

    </div>
  )
};