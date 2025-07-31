# api_nodejs# API de Usuários 📘

Este projeto é uma API RESTful simples construída com **Node.js**, **Express** e **MySQL**, ideal para fins educacionais e acadêmicos. A API permite **cadastrar** e **listar usuários**, utilizando **senha criptografada com Bcrypt**.

## 📚 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Docker + Docker Compose
- Bcrypt (criptografia de senha)
- Dotenv (variáveis de ambiente)

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Clonar o Repositório

```bash
git clone https://github.com/seuusuario/api-usuarios.git
cd api-usuarios
```

### 3. Rodar com Docker Compose

```bash
docker-compose up --build
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Endpoints

### ▶ Criar Usuário

`POST /api/usuarios`

**Body JSON:**

```json
{
  "nome": "Maria da Silva",
  "email": "maria@example.com",
  "senha": "123456"
}
```

**Respostas:**
- `201 Created`: Usuário cadastrado com sucesso.
- `409 Conflict`: E-mail já cadastrado.
- `400 Bad Request`: Campos obrigatórios ausentes.

---

### ▶ Listar Usuários

`GET /api/usuarios`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Maria da Silva",
    "email": "maria@example.com"
  }
]
```

---

## 🛠 Banco de Dados

- Nome: `api_usuarios`
- Tabela: `usuarios`
- Campos: `id`, `nome`, `email`, `senha` (criptografada)

---

## 📂 Estrutura de Pastas

```
api-usuarios/
├── src/
│   ├── controllers/
│   │   └── usuarioController.js
│   ├── routes/
│   │   └── usuarioRoutes.js
│   ├── database.js
│   └── index.js
├── init.sql
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env
```

---

## 📦 Importação no Postman

1. Abra o Postman
2. Vá em `Import > File`
3. Importe o arquivo `api-usuarios-postman-collection.json` disponível neste repositório
4. Teste os endpoints!

---

## 👨‍🏫 Uso Acadêmico

Este projeto pode ser utilizado por professores e alunos para fins de:
- Ensino de APIs REST
- Demonstração de autenticação básica
- Exemplos de uso de containers com banco de dados
- Projetos de aprendizado com Node.js e MySQL

---

## 📝 Licença

Uso educacional livre. Crie, modifique e compartilhe! 🤝
