const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

function loadUsers() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

exports.getUsuarios = (req, res) => {
  const usuarios = loadUsers();
  res.json(usuarios);
};

exports.createUsuario = (req, res) => {
  const usuarios = loadUsers();
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
  }

  const novoUsuario = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    email
  };

  usuarios.push(novoUsuario);
  saveUsers(usuarios);
  res.status(201).json(novoUsuario);
};

exports.updateUsuario = (req, res) => {
  const usuarios = loadUsers();
  const { id } = req.params;
  const { nome, email } = req.body;

  const usuario = usuarios.find(u => u.id === parseInt(id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  usuario.nome = nome || usuario.nome;
  usuario.email = email || usuario.email;

  saveUsers(usuarios);
  res.json(usuario);
};

exports.deleteUsuario = (req, res) => {
  let usuarios = loadUsers();
  const { id } = req.params;

  const index = usuarios.findIndex(u => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const usuarioRemovido = usuarios.splice(index, 1);
  saveUsers(usuarios);
  res.json({ mensagem: 'Usuário removido com sucesso.', usuario: usuarioRemovido });
};
