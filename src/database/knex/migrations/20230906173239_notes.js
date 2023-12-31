
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");

  table.string("title").notNullable();
  table.text("description").nullable();

  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("notes");