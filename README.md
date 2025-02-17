# Documentação do Projeto - Gerenciamento de Cursos e Matrículas

Projeto desenvolvido como Desafio Técnico para a vaga de Estágio em Desenvolvimento Full Stack da Voitto, 2025.

Consiste em uma aplicação FullStack para gerenciamento de cursos e matrículas. Foi desenvovildo utilizando **Next.js** no frontend e **Express** com **SQLite** no backend.

## Requisitos

- Node.js instalado (versão recomendada: 18+)
- Gerenciador de pacotes **npm** ou **yarn**

## Estrutura do Repositório

```
├── client/    # Aplicação frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Configuração e páginas da aplicação
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── styles/        # Estilos globais
│   │   ├── utils/         # Funções auxiliares
│   │   │   ├── countEnrollments.js  # Conta alunos por curso
│   │   │   ├── exportToCSV.js       # Exporta dados para CSV
├── server/    # API backend (Express + SQLite)
│   ├── src/
│   │   ├── controllers/   # Lógica de controle da API
│   │   ├── routes/        # Definição de rotas
│   │   ├── database.js    # Configuração do banco de dados
│   │   ├── server.js      # Configuração principal do servidor
├── README.md  # Documentação
```

## Como Rodar o Projeto

### 1. Clone o repositório
```sh
git clone https://github.com/LuanBarbs/voitto-fullstack-challenge.git
```

### 2. Acesse a pasta **voitto-fullstack-challenge**
```sh
cd voitto-fullstack-challenge
```

### 3. Configurar e Iniciar o backend

Acesse a pasta **server**:

```sh
cd server
```

Instale as dependências:

```sh
npm install
```

Inicie o servidor backend:

```sh
npm run dev
```

O backend rodará na porta **8080**.

### 4. Configurar e iniciar o frontend

Acesse a pasta **client**:

```sh
cd ../client
```

Instale as dependências:

```sh
npm install
```

Inicie o servidor frontend:

```sh
npm run dev
```

O frontend rodará na porta **3000**.

## Funcionalidades Implementadas

### 1. Manipulação de Dados (JavaScript Puro)

A função `countEnrollments.js` conta o total de alunos por curso a partir de um array de matrículas, utilizando `reduce()`.

#### Exemplo de entrada:

```js
const matriculas = [
  { id: 1, curso: "JavaScript Avançado", aluno: "Alice" },
  { id: 2, curso: "React do Zero", aluno: "Bob" },
  { id: 3, curso: "JavaScript Avançado", aluno: "Carlos" }
];
```

#### Saída esperada:

```json
{
  "JavaScript Avançado": 2,
  "React do Zero": 1
}
```

#### Testes:

O projeto inclui testes unitários com **Jest** para validação da lógica da função.

Acesse a pasta **client**:

```sh
cd client
```

Execute os testes:

```sh
npm test
```

### 2. API REST (Node.js + Express + SQLite)

O backend gerencia cursos e matrículas, armazenando os dados em um banco **SQLite**. As rotas principais são:

#### **Cursos:**

- `POST /cursos` → Criar um novo curso
- `GET /cursos` → Listar todos os cursos
- `GET /cursos/:id` → Buscar um curso pelo ID
- `PUT /cursos/:id` → Atualizar um curso
- `DELETE /cursos/:id` → Excluir um curso

#### **Matrículas:**

- `POST /matriculas` → Criar uma matrícula
- `GET /matriculas/:idCurso` → Listar alunos matriculados em um curso

### 3. Frontend (React + Next.js)

O frontend exibe uma lista de cursos e permite:

- Filtrar cursos por nome.
- Matricular alunos em um curso.
- Deletar um curso.
- Acessar uma página de detalhes do curso (`/cursos/[id]`), permitindo edição e listagem de alunos matriculados.
- Utilização de React Server Components.

## Extras Implementados

- Validação para evitar matrículas duplicadas.
- Estados de **loading** ao buscar dados da API.
- Exportação da lista de alunos para **CSV**.
