const db = require("./pool");

async function registerUser(
  firstname,
  lastname,
  username,
  password,
  membership
) {
  try {
    const SQL = `
  INSERT INTO "users" (firstname, lastname, username, password, membership)
  VALUES ($1, $2, $3, $4, $5);
`;

    await db.query(SQL, [firstname, lastname, username, password, membership]);

    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

async function getUser(username) {
  const SQL = `SELECT * FROM users where username = ($1)`;
  const { rows } = await db.query(SQL, [username]);
  return rows[0] || null;
}

async function getUserById(id) {
  const SQL = `SELECT id, firstname, lastname, username, membership  FROM users where id = ($1)`;
  const { rows } = await db.query(SQL, [id]);
  return rows[0] || null;
}

async function createMessage(userid, message) {
  try {
    const SQL = `
    INSERT INTO message (userid, message)
    VALUES ($1, $2); 
  `;
    await db.query(SQL, [userid, message]);
    return true;
  } catch (error) {
    console.log("[createMessage]: ", error);
    return false;
  }
}

async function getMessages() {
  try {
    const SQL = `
      SELECT * FROM message 
      INNER JOIN users
      ON message.userid = users.id;  
    `;
    const { rows } = await db.query(SQL);
    const messages = rows.map((msg) => {
      return {
        id: msg.id,
        message: msg.message,
        userid: msg.id,
        firstname: msg.firstname,
        lastname: msg.lastname,
        membership: msg.membership,
      };
    });
    return messages;
  } catch (error) {
    console.log("[getMessage] ", error);
    return [];
  }
}

async function updateMembership(id) {
  try {
    const SQL = `
      UPDATE users
      SET membership = true
      WHERE id = ($1);
    `;
    await db.query(SQL, [id]);
  } catch (error) {
    console.log("[updateMembership]: ", error);
    return null;
  }
}

module.exports = {
  registerUser,
  getUser,
  getUserById,
  createMessage,
  getMessages,
  updateMembership,
};
