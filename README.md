# 🏦 FrBankBackend

Este é o backend da aplicação **FrBank**, desenvolvido com **Node.js** e **TypeScript**.  
Ele fornece uma API RESTful para gerenciamento de contas bancárias, transações e autenticação de usuários.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 🛠️ Instalação

Clone o repositório:

```bash
git clone https://github.com/Felipe-Reggiane/FrBankBackend.git
cd FrBankBackend
```

Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

## 🔐 Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo (edite os valores conforme sua configuração):

```bash
DB_HOST=host_name            # Substitua pelo host do seu banco
DB_PORT=5432
DB_USER=postgres             # Usuário do PostgreSQL
DB_PASS=host_password        # Senha do banco
DB_NAME=db_name              # Nome do banco de dados
PORT=3000                    # Altere se o frontend estiver na mesma porta
JWT_SECRET=random_secret_key # Chave secreta para autenticação
```

## 🗄️ Configure o Banco de Dados

Crie um banco de dados no pgAdmin (ferramenta do PostgreSQL).

Utilize os mesmos valores definidos no .env

Rode o projeto para verificar a conexão no terminal

Se tudo estiver configurado corretamente, uma mensagem será exibida informando que a conexão foi estabelecida com sucesso.

## ▶️ Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

ou

```bash
yarn dev
```

A API estará disponível em:

http://localhost:3000
