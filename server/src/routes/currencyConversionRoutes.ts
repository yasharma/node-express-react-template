import { Router, Response } from 'express';
import { CurrencyConversionController} from '../controllers/currencyConversion.controller';
import { ExchangeRateAPIService } from '../services/exchangeratesapi.service';

export default () => {
    const router = Router();
    router.route('/currency_EUR/:amount')
      .get((req: any, res: Response, next) => {
        return new CurrencyConversionController(new ExchangeRateAPIService()).currency_EUR(req, res, next);
      });
      return router;
    };