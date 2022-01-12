const mysql = require("mysql2/promise");

async function makeConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "crm",
      password: "Sohrabaut7",
    });

    return connection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = makeConnection;
