"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import colors from "@/utils/colors";

export default function EditCursoPage() {
    const [courseId, setCourseId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [workload, setWorkLoad] = useState(0);

    const router = useRouter();
    const params = useParams();

    // Função que chama a API para editar o curso.
    async function handleSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:8080/cursos/${courseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, workload }),
        });
        router.push(`/cursos/${courseId}`);
    };

    useEffect(() => {
        async function fetchCurso() {
            if (!params?.id) return;

            const res = await fetch(`http://localhost:8080/cursos/${params.id}`);
            if (res.ok) {
                const course = await res.json();
                setCourseId(course.id);
                setName(course.name);
                setDescription(course.description);
                setWorkLoad(course.workload);
            }
        };

        fetchCurso();
    }, [params?.id]); // O useEffect é executado quando o ID do curso estiver disponível.

    return (
        <div className={`min-h-screen ${colors.background} p-8`}>
            <h1 className={`text-2xl font-bold ${colors.text}`}>Editar Curso</h1>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <label className="text-gray-700 text-lg">Nome do curso:</label>
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
                <label className="text-gray-700 text-lg">Descrição:</label>
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
                <label className="text-gray-700 text-lg">Carga horária:</label>
                <input
                    type="number"
                    placeholder="Carga Horária"
                    value={workload}
                    onChange={(e) => setWorkLoad(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
                <button type="submit" className={`px-4 py-2 ${colors.primary} ${colors.primaryHover} text-white rounded-md`}>
                    Salvar
                </button>
            </form>
        </div>
    );
};