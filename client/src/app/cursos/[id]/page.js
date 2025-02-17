import React from "react";
import colors from "@/utils/colors";
import Link from "next/link";

import ExportButton from "@/components/ExportButton";
import countEnrollments from "@/utils/countEnrollments";

// Fetch do curso direto do componente do servidor.
async function getCourse(id) {
    const res = await fetch(`http://localhost:8080/cursos/${id}`, {
        cache: "no-store", // Garante que sempre irá pegar os dados mais recentes.
    });
    if (!res.ok) throw new Error("Erro buscando curso.");
    return res.json();
};

// Fetch das matrículas do curso.
async function getEnrollments(courseId) {
    const res = await fetch(`http://localhost:8080/matriculas/${courseId}`, {
        cache: "no-store",
    });
    if(!res.ok) throw new Error("Erro ao buscar matrículas.");
    return res.json();
};

// Obtém o total de alunos.
function getTotalStudents(enrollments, courseName) {
    let courseEnrollment = [];
    let i = 1;
    enrollments.forEach((enrollment) => {
        const newEnrollment = {
            id: i,
            curso: courseName,
            aluno: enrollment.student_name,
        };

        courseEnrollment.push(newEnrollment);
    });

    return countEnrollments(courseEnrollment);
};

// Página do curso.
export default async function CoursePage({ params }) {
    const { id } = await params; // Aguarda `params` ser resolvido.

    if (!id) return <p>Carregando...</p>;

    const course = await getCourse(id);
    const enrollments = await getEnrollments(course.id);

    if(!course || !enrollments) return <p>Carregando...</p>;

    const totalStudents = getTotalStudents(enrollments, course.name);

    return (
        <div className={`min-h-screen ${colors.background} p-8`}>
            <h1 className={`text-3xl font-bold ${colors.text}`}>{course.name}</h1>
            <p className={`mt-2 ${colors.text}`}>{course.descricao}</p>
            <div className="flex justify-between">
                <h2 className={`mt-4 text-xl font-semibold ${colors.text}`}>Alunos Matriculados</h2>
                <h2 className={`mt-4 text-xl font-semibold ${colors.text}`}>Total de Alunos: {totalStudents[course.name] ?? 0}</h2>
            </div>
            <ul className="mt-2 border border-gray-300 rounded-md p-4">
                {enrollments.map((enrollment) => (
                    <li key={enrollment.id} className={`p-2 border-b ${colors.tableBorder}`}>{enrollment.student_name}</li>
                ))}
            </ul>
            <div className="mt-4 flex gap-4">
                <Link href={`/cursos/${id}/edit`}>
                    <button className={`px-4 py-2 ${colors.primary} ${colors.primaryHover} text-white rounded-md`}>
                        Editar Curso
                    </button>
                </Link>
                <ExportButton enrollments={enrollments} />
            </div>
        </div>
    );
};