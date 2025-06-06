🏦 FrBankBackend
Este é o backend da aplicação FrBank, desenvolvido com Node.js e TypeScript. Ele fornece uma API RESTful para gerenciamento de contas bancárias, transações e autenticação de usuários.

🚀 Tecnologias Utilizadas
Node.js

TypeScript

Express

Prisma ORM

PostgreSQL

JWT para autenticação

📦 Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 16 ou superior)

npm ou Yarn

PostgreSQL

🛠️ Instalação
Clone o repositório:

git clone https://github.com/Felipe-Reggiane/FrBankBackend.git
cd FrBankBackend
Instale as dependências:

npm install

# ou

yarn install
Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

env

DB_HOST=host_name # need change
DB_PORT=5432
DB_USER=postgres
DB_PASS=host_password # need change
DB_NAME=db_name # need change
PORT=3000 # need change if your frontend is running on port 3000
JWT_SECRET=random_secret_key # need change

Configure o banco de dados:

criei um banco novo no pgAdmin (aplicação do postgresSQl) e configure ele com as mesmas variaveis utilizadas no .env, rode o projeto, irá aparecer logs no terminal dizendo se a conexão foi bem sucedida ou não.

▶️ Executando a Aplicação
Inicie o servidor de desenvolvimento:

npm run dev

# ou

yarn dev

A API estará disponível em http://localhost:3000.
