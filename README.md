# MiniProjeto
testando yarn em API simples:.
Questão:
1-Crie uma API REST com Node.js utilizando Express que exponha uma rota GET /saudacao e retorne um JSON com a mensagem: "Bem-vindo à API de exemplo".

2-Implemente um endpoint POST /usuarios que receba um corpo JSON com nome e email e adicione esse objeto a um array em memória.

3-Implemente a rota GET /usuarios para listar todos os usuários cadastrados no array.

4-Implemente uma rota PUT /usuarios/:id que atualize os dados de um usuário (nome e email) com base no id passado como parâmetro.

5-Crie uma rota DELETE /usuarios/:id que remova o usuário correspondente ao id informado.

Comandos básicos para iniciar e preparar um projeto Node.js com yarn, express e nodemon.
npm init => Iniciar o projeto
npm install -g yarn => baixar as dependencia do yarn
yarn add express => baixar o framework express pelo yarn
yarn global add nodemon =>baixar Nodemon para que o serve se auto-save
caso o comando a cima nao funcione , abra o PowerShell(Nao é o terminal) como adm e execute a linha " Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned"