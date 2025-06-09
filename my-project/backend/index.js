require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./models/index"); // conexão com o banco
const Usuario = require("./models/usuario"); // model do usuário

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conecta e sincroniza com o banco de dados MySQL
sequelize.sync({ alter: true })
  .then(() => console.log("MySQL sincronizado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao MySQL:", err));

// Rota de cadastro
app.post("/register", async (req, res) => {
  try {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
      return res.status(400).json({ mensagem: "Dados incompletos." });
    }

    const novoUsuario = await Usuario.create({ nome, email, cpf });

    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota /register:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar." });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ mensagem: "Email e CPF são obrigatórios." });
    }

    const usuario = await Usuario.findOne({ where: { email, cpf } });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    res.json({ mensagem: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota /login:", error);
    res.status(500).json({ mensagem: "Erro no login." });
  }
});

// Rota de listagem de usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ mensagem: "Erro ao buscar usuários." });
  }
});

// Rota de remoção de usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioRemovido = await Usuario.destroy({ where: { id } });

    if (!usuarioRemovido) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    res.status(500).json({ mensagem: "Erro ao remover usuário." });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
