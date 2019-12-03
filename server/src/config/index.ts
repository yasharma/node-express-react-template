const config: {
  host: string;
  port: string;
  from: string;
  to: string;
  exchangeRateUrl: string;
} = <any>{
  port: 8090,
  from: 'HKD',
  to: 'EUR',
  exchangeRateUrl: 'https://api.exchangeratesapi.io'
};
if (typeof process.env.APP_HOST !== 'undefined') {
  config.host = process.env.APP_HOST;
}
if (typeof process.env.APP_PORT !== 'undefined') {
  config.port = process.env.APP_PORT;
}
if (process.env.FROM) config.from = process.env.FROM;
if (process.env.TO) config.to = process.env.TO;
if (process.env.EXCHANGE_RATE_URL) config.exchangeRateUrl = process.env.EXCHANGE_RATE_URL;
console.info('Config for the app: %o', config);

export default config;