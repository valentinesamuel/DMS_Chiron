export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  authDbHost: process.env.AUTH_DB_HOST,
  authDbPort: parseInt(process.env.AUTH_DB_PORT),
  authDbUsername: process.env.AUTH_DB_USERNAME,
  authDbPassword: process.env.AUTH_DB_PASSWORD,
  authDbName: process.env.AUTH_DB_NAME,
  authRmqUsername: process.env.RABBITMQ_USERNAME,
  authRmqPassword: process.env.RABBITMQ_PASSWORD,
  authRmqHost: process.env.RABBITMQ_HOST,
  authRmqQueue: process.env.RABBITMQ_AUTH_QUEUE,
});
