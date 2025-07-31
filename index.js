const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(express.json());

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexao.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    conexao.query(sql, [nome, email, senhaCriptografada], (err, resultado) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ erro: 'E-mail já cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao inserir usuário.', detalhes: err });
      }

      res.status(201).json({
        mensagem: 'Usuário criado com sucesso!',
        usuario: { id: resultado.insertId, nome, email }
      });
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criptografar a senha.' });
  }
});

app.get('/usuarios', (req, res) => {
  conexao.query('SELECT id, nome, email FROM usuarios', (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
    res.json(resultados);
  });
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
