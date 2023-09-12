const knex = require("../database/knex");


class TagsController {

  async index(request, response) {
    const user_id = request.user.id;


    const tags = await knex("tags")
      .where({ user_id })
      .select("name")
      .orderBy("name")
      .groupBy("name");


    response.status(200).json({
      status: "Ok.",
      message: "Tags encontradas com sucesso.",
      tags
    });
  };
};


module.exports = TagsController;