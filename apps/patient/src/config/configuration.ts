export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  patientDbHost: process.env.PATIENT_DB_HOST,
  patientDbPort: parseInt(process.env.PATIENT_DB_PORT),
  patientDbUsername: process.env.PATIENT_DB_USERNAME,
  patientDbPassword: process.env.PATIENT_DB_PASSWORD,
  patientDbName: process.env.PATIENT_DB_NAME,
  patientRmqUsername: process.env.RABBITMQ_USERNAME,
  patientRmqPassword: process.env.RABBITMQ_PASSWORD,
  patientRmqHost: process.env.RABBITMQ_HOST,
  patientRmqQueue: process.env.RABBITMQ_PATIENT_QUEUE,
});
