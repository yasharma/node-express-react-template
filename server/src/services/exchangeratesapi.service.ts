import request from 'request';
import config from '../config';
import { ICurrencyConverter } from '../models/ICurrencyConvertor';
export class ExchangeRateAPIService {

    public getExchangeRateAPI_EUR() {
        const url = `${config.exchangeRateUrl}/latest/?base=${config.from}`;
        console.debug(`Hitting GET with url ${url}`);
        return new Promise<ICurrencyConverter>((resolve, reject) => {
          request(url, {
            headers: {}, json: true
          }, (error: any, response: request.Response, body: any) => {
            if (error) return reject(error);
            if (response.statusCode !== 200) return reject(body);
            console.debug(`Response from ${url} is ${JSON.stringify(body)}`);
            return resolve(body);
          });
        });
      }

}