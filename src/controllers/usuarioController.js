const bcrypt = require('bcrypt');
const pool = require('../database');

const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [resultado] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senhaCriptografada]
    );

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: { id: resultado.insertId, nome, email },
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }
    res.status(500).json({ erro: 'Erro ao inserir usuário.', detalhes: err.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.execute('SELECT id, nome, email FROM usuarios');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.', detalhes: err.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
};
