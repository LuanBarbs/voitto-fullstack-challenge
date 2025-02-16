const countEnrollments = require("./countEnrollments");

// Teste unitário simples, deve retornar um resultado comum esperado.
test("Deve contar corretamente os alunos por curso", () => {
    // Conjunto de matrículas para testar a função.
    const enrollments = [
        { id: 1, curso: "JavaScript Avançado", aluno: "Alice" },
        { id: 2, curso: "React do Zero", aluno: "Bob" },
        { id: 3, curso: "JavaScript Avançado", aluno: "Carlos" },
        { id: 4, curso: "Node.js para Backend", aluno: "Daniela" },
        { id: 5, curso: "React do Zero", aluno: "Eduardo" },
    ];

    // Verifica se a função retorna o resultado esperado.
    expect(countEnrollments(enrollments)).toStrictEqual({
        "JavaScript Avançado": 2,
        "React do Zero": 2,
        "Node.js para Backend": 1
    });
});

// Teste que passa um array vazio, deve retornar um objeto vazio.
test("Deve retornar objeto vazio se o array de matrículas estiver vazio", () => {
    expect(countEnrollments([])).toStrictEqual({});
});

// Teste para um único curso com várias matrículas.
test("Deve retornar um objeto com único curso", () => {
    const enrollments = [
        { id: 1, curso: "Next.js", aluno: "Luan" },
        { id: 2, curso: "Next.js", aluno: "Sara" },
        { id: 3, curso: "Next.js", aluno: "Gabriel" },
        { id: 4, curso: "Next.js", aluno: "Fernando" },
        { id: 5, curso: "Next.js", aluno: "Maria" },
    ];

    expect(countEnrollments(enrollments)).toStrictEqual({
        "Next.js": 5,
    });
});

// Teste para vários cursos com apenas um aluno.
test("Deve retornar um objeto com cursos de apenas uma matrícula", () => {
    const enrollments = [
        { id: 1, curso: "C++ Básico", aluno: "Alice" },
        { id: 2, curso: "Java Fundamentos", aluno: "Bob" },
        { id: 3, curso: "Three.js", aluno: "Carlos" },
    ];

    expect(countEnrollments(enrollments)).toStrictEqual({
        "C++ Básico": 1,
        "Java Fundamentos": 1,
        "Three.js": 1,
    });
});


// Teste passando nomes de curso com diferenças entre letras maiúsculas e minúsculas.
test("Deve diferenciar cursos com nomes em maiúsculas/minúsculas", () => {
    const enrollments = [
        { id: 1, curso: "React", aluno: "Alice" },
        { id: 2, curso: "react", aluno: "Bob"},
    ];

    expect(countEnrollments(enrollments)).toStrictEqual({
        "React": 1,
        "react": 1
    });
});