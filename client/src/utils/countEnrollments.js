// Função que recebe um array de matrículas e retorna o total de alunos por curso.
function countEnrollments(enrollments) {
    return enrollments.reduce((acc, enrollment) => {
        // Se o curso já foi adicionado no acumulador, incrementa a contagem de alunos.
        if (acc[enrollment.curso] != undefined) {
            acc[enrollment.curso] = acc[enrollment.curso] + 1;
        } else {
            // Se o curso ainda não foi adicionado, inicializa a contagem com 1.
            acc[enrollment.curso] = 1;
        }

        return acc;
    }, {});
}

export default countEnrollments;
