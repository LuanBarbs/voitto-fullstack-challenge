"use client"

import React from "react";
import { exportToCSV } from "@/utils/exportToCsv";

export default function ExportButton({ enrollments }) {
    return (
        <button
            onClick={() => exportToCSV(enrollments)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
            Exportar CSV
        </button>
    );
};