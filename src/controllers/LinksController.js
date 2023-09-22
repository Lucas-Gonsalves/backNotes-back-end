const knex = require("../database/knex");

class LinksController {
  

  async index(request, response) {
    const { note_id } = request.query;
    let links = [];


    links = await knex("links")
      .select("url")
      .where({ note_id });


    response.status(200).json({
      status: "Ok.",
      message: "Método get Realizado com sucesso",
      links
    });
  };
};


module.exports = LinksController;