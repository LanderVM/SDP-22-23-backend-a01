module.exports = {
  env: "NODE_ENV",
  database: {
    username_local: "DATABASE_USERNAME_LOCAL",
    password_local: "DATABASE_PASSWORD_LOCAL",
    username_host: "DATABASE_USERNAME_HOST",
    password_host: "DATABASE_PASSWORD_HOST",
  },
  auth: {
    jwksUri: "AUTH_JWKS_URI",
    audience: "AUTH_AUDIENCE",
    issuer: "AUTH_ISSUER",
    userInfo: "AUTH_USER_INFO",
  },
};
