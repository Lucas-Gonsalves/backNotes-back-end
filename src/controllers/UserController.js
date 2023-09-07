const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")


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


  async update(request, response) {

    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;


    const user = await knex("users")
      .where({ id: user_id })
      .first();


    if(!user) {
      throw new AppError("Usuário não encontrado.");
    };

    
    if(name && name.length < 3) {
      throw new AppError("Nomes de usuário devem conter no mínimo 3 caracteres.");
    };


    if(password && password.length < 4) {
      throw new AppError("Senha muito fraca.");
    };


    user.name = name ?? user.name;


    if(email || password) {
      const verifyPassword = await compare(old_password, user.password);

      if(!verifyPassword) {
        throw new AppError("Senha incorreta.");
      };
    };


    if(email && email !== user.email) {

      const checkEmailExists = await knex("users")
        .select("email")
        .where({ email })
        .first();


      if(checkEmailExists) {
        throw new AppError("Este email já esta em uso.");
      };


      user.email = email;
    };


    if(password) {
      const securePassword = await hash(password, 8);

      user.password = securePassword;
    };


    const updatedUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };


    await knex("users")
      .where({ id: user_id })
      .update(updatedUser);


    return response.status(200).json({
      status: "Ok.",
      message: "Usuário atualizado com sucesso.",
    });
  };
};


module.exports = UserController 