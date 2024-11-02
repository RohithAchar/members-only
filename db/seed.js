const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        membership BOOLEAN NOT NULL
    );

    CREATE TABLE IF NOT EXISTS message (
        id SERIAL PRIMARY KEY,
        message VARCHAR(255) NOT NULL,
        userid INTEGER,
        CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES "users" (id)
    );

    -- Sample insert
    INSERT INTO "users" (firstname, lastname, username, password, membership)
    VALUES ('ABC', 'aaa', 'a@gmail.com', 'asdsad', false);
`;

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres:password@localhost:5432",
  });

  try {
    console.log("Seeding...");
    await client.connect();
    await client.query(SQL);
    console.log("Completed");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
  }
}

main();
