import loggerFactory from '../utils/logging';
const config: {
  host: string;
  port: string;
  questionBankUri: string;
} = <any>{
  host: 'localhost',
  port: '8096'
};

if (typeof process.env.APP_HOST !== 'undefined') {
  config.host = process.env.APP_HOST;
}
if (typeof process.env.APP_PORT !== 'undefined') {
  config.port = process.env.APP_PORT;
}
if (typeof process.env.QUESTION_BANK_URI !== 'undefined') {
  config.questionBankUri = process.env.QUESTION_BANK_URI;
}
const logger = loggerFactory.getLogger('Config');
logger.info(
  '----------------------------------------------------------------------------'
);
logger.info('Config for the app: %o', config);
logger.info(
  '----------------------------------------------------------------------------'
);

if (!config.host || config.host === '') {
  logger.error('Missing parameter: APP_HOST! Exiting...');
  process.exit(1);
}
if (!config.port || config.port === '') {
  logger.error('Missing parameter: APP_PORT! Exiting...');
  process.exit(1);
}
export default config;