import axios, { CancelToken } from "axios";
import { config } from '../config';
export default class HttpService {

	/**
	 * 
	 * @param url request url
	 * @param data request body
	 * @param cancelToken axios cancel token
	 * <T> specify the type of response it return
	 * <BT> request body type
	 */

	static get<T>(url: string, cancelToken?: CancelToken): Promise<T> {
		const path = `${config.conversionUrl}/${url}`;
		return new Promise((resolve, reject) => {
			axios
				.get(path, { cancelToken })
				.then(response => {
					resolve(response.data as T)
				})
				.catch(error => {
					reject(error)
				})
		});
	}

}