const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.listen(port, () => {
  console.log("SERVER TA LIGADO NA PORTA 8000");
});

mongoose
  .connect(
    "mongodb+srv://joaovitorcaversan:joaovitorcaversan@cluster0.aufpkqx.mongodb.net/"
  )
  .then(() => {
    console.log("Mongoose conectado");
  })
  .catch((err) => {
    console.log("Erro ao conectar no mongoose", err);
  });

//endpoint para cadastrar no aplicativo

const User = require("./models/user");
const Order = require("./models/order");

//funcao para enviar email de verificação para o usuário
const sendVerificationEmail = async (email, verificationToken) => {
  // criando o nodemailer transport

  const transporter = nodemailer.createTransport({
    //configurando o serviço de email
    service: "gmail",
    auth: {
      user: "joaovitorcaversan@gmail.com",
      pass: "klzpiciadpqdrgcm",
    },
  });

  //criar a mensagem do email
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Verificação de Email",
    text: `Por favor, clique no link para confirmar o seu endereço de email : http://localhost:8000/verify/${verificationToken} `,
  };

  //enviar o email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Erro ao enviar o email de confirmação", error);
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // verificar se o email ja existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já está sendo utilizado" });
    }
    // criar novo usuário
    const newUser = new User({ name, email, password });
    res.status(201).json({
      message:
        "Usuário registrado com sucesso, verifique o email para confirmar o registro",
    });

    // gerar e guardar o verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //salvar o usuário no database
    await newUser.save();

    //enviar email de verificação para o usuário
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration Failed" });
  }
});

//endpoint para verificar o token do email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //achar o usuário que está utilizando o token de verificação
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Verificação de token inválida" });
    }

    // marcar o usuário como verificado
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verificado com Sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Falha na verificação do email" });
  }
});

//gerando o secretkey do jsonwebtoken com a funcao generatesecretkey

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint para fazer o login do usuario

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //verificar se o usuário existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    //verificar se o password está correto
    if (user.password !== password) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }
    // generate token
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Falha no Login" });
  }
});

//endpoint para armazenar novo endereço no backend
app.post("/enderecos", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //encontrar o userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    //adiconar o novo endereço ao array de endereços do usuario
    user.addresses.push(address);

    //salvar o usuario atualizado no backend
    await user.save();

    res.status(200).json({ message: "Endereço criado com Sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar o endereço" });
  }
});

app.post("/endereços", async (req, res) => {
  res.redirect("/enderecos");
});

//endpoint para pegar todos os endereços de um usuario

app.get("/enderecos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const address = user.addresses;
    res.status(200).json({ address });
  } catch (error) {
    res.status(500).json({ message: "Erro ao tentar acessar os endereços" });
  }
});

app.get("/endereços/:userId", async (req, res) => {
  res.redirect("/enderecos/:userId");
});
