const express = require('express');
const app = express();
const usuarioRoutes = require('./src/routes/usuarioRoutes');

app.use(express.json());

app.get('/saudacao', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à API de exemplo' });
});

app.use('/usuarios', usuarioRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
