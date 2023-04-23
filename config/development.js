module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  port: 9000,

  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },

  database: {
    client: "mysql2",
    host: "192.168.56.101",
    port: 3306,
    name: "sdp2",
  },
};
