const { Pool } = require("pg");

const db = new Pool({
  connectionString: "postgresql://postgres:password@localhost:5432",
});

module.exports = db;
