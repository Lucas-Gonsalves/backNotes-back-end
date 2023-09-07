const knex = require("../database/knex");
const { compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const { sign } = require("jsonwebtoken");
const authConfig = require("../config/auth");


class SessionController {


  async create(request, response) {
    const { email, password } = request.body;

    
    if(!email || !password) {
      throw new AppError("Senha/E-mail não fornecido.");
    };


    const user = await knex("users")
      .select("id", "name", "email", "password", "avatar")
      .where({ email })
      .first();


    if(!user) {
      throw new AppError("Usuário não encontrado.");
    };


    const verifyPassword = await compare(password, user.password);


    if(!verifyPassword) {
      throw new AppError("Senha/E-mail incorretos.");
    };
  

    const { secret, expiresIn } = authConfig.jwt;


    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });
    

    return response.status(200).json({
      status: "Ok.",
      message: "Autenticação realizada com sucesso.",
      user,
      token
    });
  };
};


module.exports = SessionController;