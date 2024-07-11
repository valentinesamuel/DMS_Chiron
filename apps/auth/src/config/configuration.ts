export default () => ({
  port: parseInt(process.env.PORT),
  authDbHost: process.env.AUTH_DB_HOST,
  authDbPort: parseInt(process.env.AUTH_DB_PORT),
  authDbUsername: process.env.AUTH_DB_USERNAME,
  authDbPassword: process.env.AUTH_DB_PASSWORD,
  authDbName: process.env.AUTH_DB_NAME,
  nodeEnv: process.env.NODE_ENV,
});
