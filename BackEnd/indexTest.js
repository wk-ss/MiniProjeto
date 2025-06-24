const express = require('express');

const fs = require('fs');
const path = require('path');

const server = express();
server.use(express.json());

// Caminho completo do db.json
const dbPath = path.join(__dirname, 'src', 'data', 'db.json');

// Função para ler o db.json
function lerDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Função para escrever no db.json
function salvarDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Testar servidor
server.get('/', (req, res) => {
  return res.json({ mensagem: 'Servidor está rodando!' });
});

// Testar GET saudacao
server.get('/saudacao', (req, res) => {
  return res.json({ mensagem: "Bem-vindo à API de exemplo" });
});
// GET /db – listar todos os dados
server.get('/db', (req, res) => {
  const dados = lerDB();
  res.json(dados);
});

// POST /usuarios – adicionar novo usuário
/* ex:.{
  "nome": "Carlos",
  "email": "carlos@email.com"
}*/
server.post('/usuarios', (req, res) => {
  const db = lerDB();
  const novoUsuario = req.body;

  // Gera ID automático
  novoUsuario.id = db.length ? db[db.length - 1].id + 1 : 1;

  db.push(novoUsuario);
  salvarDB(db);

  res.status(201).json(novoUsuario);
});

// PUT /usuarios/:id – atualizar usuário
/*ex:. coloque o id na url q deseja atualizar
{

  "nome": "Maria Clara",
  "email": "mariaclara@email.com"
}
 */
server.put('/usuarios/:id', (req, res) => {
  const db = lerDB();
  const id = parseInt(req.params.id);
  const novoDado = req.body;

  const index = db.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });

  db[index] = { ...db[index], ...novoDado };
  salvarDB(db);

  res.json(db[index]);
});

// DELETE /usuarios/:id – remover usuário
server.delete('/usuarios/:id', (req, res) => {
  const db = lerDB();
  const id = parseInt(req.params.id);

  const novoDB = db.filter(u => u.id !== id);
  if (novoDB.length === db.length)
    return res.status(404).json({ erro: 'Usuário não encontrado' });

  salvarDB(novoDB);
  res.json({ mensagem: 'Usuário removido com sucesso' });
});

// Iniciar o servidor
server.listen(3001, () => {
  console.log('Servidor rodando: http://localhost:3001');
});
