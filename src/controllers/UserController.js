const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash } = require("bcryptjs")


class UserController { 

  async create(request, response) {

    const { name, email, password } = request.body;


    const checkEmailExists = await knex("users")
      .select("email")
      .where({ email })
      .first();
    

    if(checkEmailExists) {
      throw new AppError("Este email já esta em uso.");
    };


    if(name.length < 3) {
      throw new AppError("Nomes de usuário devem conter no mínimo 3 caracteres.");
    };

    
    if(password.length < 4) {
      throw new AppError("Senha muito fraca.");
    };


    const securePassword = await hash(password, 8);


    const newUser = {
      name,
      email,
      password : securePassword
    };


    await knex("users").insert(newUser);


    response.status(200).json({
      status: "Ok.",
      message: "Usuário criado com sucesso."
    });
  };

};


module.exports = UserController 