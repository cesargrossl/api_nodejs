const express = require('express');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());
app.use('/api', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
