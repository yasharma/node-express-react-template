import 'mocha';
import chai from 'chai';
chai.use(require('sinon-chai'));
const expect = chai.expect;
import reqres from 'reqres';
reqres.sinon = require('sinon');
import { CurrencyConversionController } from '../../src/controllers/currencyConversion.controller';
import {  ICurrencyConverter } from '../../src/models/ICurrencyConvertor';
import { getExchangeRates } from '../data';
import { ExchangeRateAPIService } from '../../src/services/exchangeratesapi.service';

describe('CurrencyConversion controller', () => {
  const exchangeRateAPIService =  new ExchangeRateAPIService();
    const currencyConversionController = new CurrencyConversionController(exchangeRateAPIService);
    it('should give currency with EUR', (done) => {
        exchangeRateAPIService.getExchangeRateAPI_EUR = () => {
            return Promise.resolve<ICurrencyConverter>(getExchangeRates);
          };
        const req = reqres.req();
        const res = reqres.res();
        req.params.amount = 1;
        res.json = (obj: number) => {
          const expected = 0.1158788834;
          expect(obj).to.deep.equal(expected);
          done();
        };
        currencyConversionController.currency_EUR(req, res, (err) => { done(err); });
        });
    });