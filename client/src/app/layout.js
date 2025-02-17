import "@/styles/globals.css";

export const metadata = {
    title: 'Aplicação Next.js',
    description: 'Aplicação que mostra cursos e matrículas e permite matriculas anos.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head />
            <body>{children}</body>
        </html>
    );  
};