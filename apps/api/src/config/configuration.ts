export default () => ({
  port: parseInt(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
});
