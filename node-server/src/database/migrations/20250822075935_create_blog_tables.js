// migrations/20250822090000_create_blog_tables.js
exports.up = async function (knex) {
  // 1) MEDIA
  await knex.schema.createTable("media", (table) => {
    table.increments("id").primary();
    table.enu("provider", ["cloudinary", "s3", "local"]).notNullable().defaultTo("cloudinary");
    table.string("public_id", 255).notNullable().index();
    table.string("url", 255).notNullable();
    table.string("alt_text", 255);
    table.enu("type", ["image", "video"]).notNullable().defaultTo("image");
    table.integer("uploaded_by").unsigned().notNullable()
      .references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // 2) BLOG CATEGORIES
  await knex.schema.createTable("blog_categories", (table) => {
    table.increments("id").primary();
    table.string("slug", 100).notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("blog_category_translations", (table) => {
    table.increments("id").primary();
    table.integer("category_id").unsigned().notNullable()
      .references("id").inTable("blog_categories").onDelete("CASCADE");
    table.string("language_code", 10).notNullable();
    table.string("name", 100).notNullable();
    table.unique(["category_id", "language_code"]);
  });

  // 3) BLOG TAGS
  await knex.schema.createTable("blog_tags", (table) => {
    table.increments("id").primary();
    table.string("slug", 50).notNullable().unique();
  });

  await knex.schema.createTable("blog_tag_translations", (table) => {
    table.increments("id").primary();
    table.integer("tag_id").unsigned().notNullable()
      .references("id").inTable("blog_tags").onDelete("CASCADE");
    table.string("language_code", 10).notNullable();
    table.string("name", 50).notNullable();
    table.unique(["tag_id", "language_code"]);
  });

  // 4) BLOG POSTS
  await knex.schema.createTable("blog_posts", (table) => {
    table.increments("id").primary();
    table.integer("author_id").unsigned().notNullable()
      .references("id").inTable("users");
    table.integer("category_id").unsigned().notNullable()
      .references("id").inTable("blog_categories");
    table.string("slug", 255).notNullable().unique();
    table.integer("thumbnail_id").unsigned()
      .references("id").inTable("media");
    table.enu("status", ["draft", "published", "archived"]).notNullable().defaultTo("draft");
    table.integer("views_count").notNullable().defaultTo(0);
    table.timestamp("published_at").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.index(["status", "published_at"], "idx_status_published_at");
  });

  await knex.schema.createTable("blog_post_translations", (table) => {
    table.increments("id").primary();
    table.integer("post_id").unsigned().notNullable()
      .references("id").inTable("blog_posts").onDelete("CASCADE");
    table.string("language_code", 10).notNullable();
    table.string("title", 255).notNullable();
    table.string("excerpt", 500);
    table.text("content", "longtext").notNullable();
    table.string("meta_title", 255);
    table.string("meta_description", 500);
    table.string("meta_keywords", 255);
    table.unique(["post_id", "language_code"]);
    table.index(["title", "excerpt", "content"], "ft_title_excerpt_content", "FULLTEXT");
  });

  // 5) BLOG POST TAGS (N-N)
  await knex.schema.createTable("blog_post_tags", (table) => {
    table.integer("post_id").unsigned().notNullable()
      .references("id").inTable("blog_posts").onDelete("CASCADE");
    table.integer("tag_id").unsigned().notNullable()
      .references("id").inTable("blog_tags").onDelete("CASCADE");
    table.primary(["post_id", "tag_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("blog_post_tags");
  await knex.schema.dropTableIfExists("blog_post_translations");
  await knex.schema.dropTableIfExists("blog_posts");
  await knex.schema.dropTableIfExists("blog_tag_translations");
  await knex.schema.dropTableIfExists("blog_tags");
  await knex.schema.dropTableIfExists("blog_category_translations");
  await knex.schema.dropTableIfExists("blog_categories");
  await knex.schema.dropTableIfExists("media");
};