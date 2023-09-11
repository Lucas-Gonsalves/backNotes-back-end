const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class NotesController {


  async create(request, response) {

    const { title, description, links, tags } = request.body;
    const user_id = request.user.id;

    
    if(!title || title.length <= 0) {
      throw new AppError("É necessário um título para a criação de uma nota.");
    };


    const [ note_id ] = await knex("notes").insert({
        
        title,
        description,
        user_id

      });


    if(tags && tags.length > 0) {

      const adaptedTags = tags.map(tagNAME => {
        
        return {
          name: tagNAME,
          note_id,
          user_id
        };

      });


      await knex("tags").insert(adaptedTags)
    }


    if(links && links.length > 0) {

      const adaptedLinks = links.map(linkURL => {
        
        return {
          url: linkURL,
          note_id
        };

      });


      await knex("links").insert(adaptedLinks);
    };


    return response.status(201).json({
      status: "Ok.",
      message: "Nota criada com sucesso."
    });
  };


  async update(request, response) {

    const { title, description } = request.body;
    const { note_id } = request.query;
    const user_id = request.user.id;

    
    const note = await knex("notes")
      .select("title", "description", "user_id", "id")
      .where({ id : note_id, user_id })
      .first();


    if(!note) {
      throw new AppError("Nota não encontrada.");
    };

    
    note.title = title ?? note.title;
    note.description = description ?? note.description;


    await knex("notes").where({ id: note.id }).update({
      title: note.title,
      description: note.description
    });


    return response.status(200).json({
      status: "Ok.",
      message: "Informações atualizadas com sucesso."
    });
  };


  async index(request, response) {
    const { title, tags, note_id } = request.query;
    const user_id = request.user.id;

    let notes = String();

    
    if(!note_id && !title && !tags.length >=0) {

      const searchUSerIdNotes = await knex("notes")
      .select("title", "description")
      .where({ user_id });


      notes = searchUSerIdNotes.length > 0 ?  searchUSerIdNotes : "Nenhuma nota cadastrada.";
    };


    if(tags.length > 0) {

      const filteredTags = tags.split(",").map(tag => tag.trim());


      const searchNotesTags = await knex("tags").select([
        "notes.title",
        "notes.description"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${ title }%`)
      .whereIn("tags.name", filteredTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .distinct()
      .orderBy("title");


      notes = searchNotesTags;
    };


    if(title && !tags.length > 0) {

      const searchNotesTitle = await knex("notes")
        .select("title", "description")
        .where({ user_id })
        .whereLike("title", `%${ title }%`)
        .orderBy("title");


      notes = searchNotesTitle;
    }


    if(note_id && !title && !tags.length >= 0) {

      const searchNoteId = await knex("notes")
        .where({ id: note_id })
        .first();


      if(!searchNoteId) {
        throw new AppError("Nota não encontrada no banco de dados.");
      };


      notes = searchNoteId;
    };

  
    return response.status(200).json({
      status: "Ok.",
      message: "Método get realizado com sucesso.",
      notes
    });

  };


  async delete(request, response) {
    const { note_id } = request.params;
    const user_id = request.user.id;


    const noteToDelete = await knex("notes")
      .where({ id: note_id, user_id })
      .first();

    
    if(!noteToDelete) {
      throw new AppError("Nota não encontrada.");
    };


    await knex("notes").where({ id: noteToDelete.id }).delete();


    return response.status(200).json({
      status: "Ok.",
      message: "Nota excluída com sucesso."
    });
  };
};


module.exports = NotesController;