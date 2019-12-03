import HttpService from "./HttpService";
import { CancelToken } from 'axios';

export default class CurrencyService {

  static getConversionAmount(amount: string, cancelToken?: CancelToken): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpService.get<any>(`currency_EUR/${amount}`)
        .then((response) => resolve(response))
        .catch(error => reject(error))
    }
    )
  }
}