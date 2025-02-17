// Função para exportar a lista de alunos em CSV.
export function exportToCSV(enrollments, fileName = "alunos.csv") {
    // Define um cabeçalho no documento.
    const header = "Nome dos Alunos:\n\n";

    // Converte a lista de alunos passada como parâmetro em uma string CSV.
    const csvData = enrollments.map((enrollment) => `${enrollment.student_name}`).join("\n");

    // Cria o blob com o conteúdo para permitir download.
    const blob = new Blob([header + csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Cria um link temporário para realizar o download do arquivo.
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Remove o link após o clique.
    document.body.removeChild(a); 
};