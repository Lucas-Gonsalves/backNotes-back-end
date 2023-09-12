const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");


class UserAvatarController {


  async update(request, response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    
    const diskStorage = new DiskStorage();
    
    const user = await knex("users")
      .where({ id: user_id })
      .first();


    if(!user) {
      throw new AppError("Usuário não encontrado.");
    };


    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    };


    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;


    await knex("users")
      .where({ id: user_id })
      .update(user);


    response.status(200).json({
      status: "Ok.",
      message: "Avatar de usuário atualizado com sucesso",
      avatar: user.avatar
    });
  };
};


module.exports = UserAvatarController;