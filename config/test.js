module.exports = {
  port: 9000,
  log: {
    level: "silly",
    disabled: true,
  },
  
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },

  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "lokale_db_sdp2_js_test",
  },
};
