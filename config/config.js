import 'dotenv/config'; // ES Modules version of dotenv

export const config = {
  PORT: process.env.PORT || 5000,
  mongoURI: process.env.LOCAL_DB,
  dbName: process.env.DB_NAME,
  ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
};
