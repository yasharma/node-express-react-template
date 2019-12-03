import { Response } from 'express';
import config from '../config';
import { ExchangeRateAPIService } from '../services/exchangeratesapi.service';
import { ICurrencyConverter } from '../models/ICurrencyConvertor';
export class CurrencyConversionController {
  constructor(
    public exchangeRateAPIService: ExchangeRateAPIService
  ) {

  }
    async currency_EUR(req, res: Response, next) {
      console.log('currency_EUR service invoked');
        try {
            const result: ICurrencyConverter =  await this.exchangeRateAPIService.getExchangeRateAPI_EUR();
            const response: number = result.rates[config.to] * req.params.amount;
            return res.status(200).json(response);
        } catch (e) {
          return next(e);
        }
}
}