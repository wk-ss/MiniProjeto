const express = require('express');
const server = express();
const db = require('./src/data/db.json');
 // Para testar o servidor, rode o codigo use "node index.js e acesse o link 'http://localhost:3000'
 // Lembrete para encerrar o servidor usa o comando "Ctrl + C"
 // Para usar o Nodemon use "yarn start"
 // Usando o arquivo db.json como arquivo de memoria

 /*Testar o servidor */
 server.get('/', (req,res)=>{
    return res.json({mensagem: 'teste do servidor'})
 });
 /*Testar o get USUARIO*/
 server.get('/usuario', (req,res) =>{
    return res.json({usuario: 'wkeiichi'})
 }); 
  /*Testar o get db*/
 server.get('/db', (req,res) =>{
    return res.json(db)
 });
server.listen(3000,() =>{
console.log('Server on ,Por incrivel que pareça... '+'http://localhost:3000');

});