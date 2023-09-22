const knex = require("../database/knex");


class TagsController {

  async index(request, response) {
    const user_id = request.user.id;
    const { note_id } = request.query;

    let tags = [];

    if(user_id && !note_id) {
      const searchTagsByUserId = await knex("tags")
        .where({ user_id })
        .select("name")
        .orderBy("name")
        .groupBy("name");
      
      tags = searchTagsByUserId
    }

    if(user_id && note_id) {
      const searchTagsByNoteId = await knex("tags")
        .where({ note_id })
        .select("name")
        .orderBy("name"); 
      
        tags = searchTagsByNoteId
    }


    response.status(200).json({
      status: "Ok.",
      message: "Tags encontradas com sucesso.",
      tags
    });
  };
};


module.exports = TagsController;