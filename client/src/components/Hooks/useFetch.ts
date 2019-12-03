import {useEffect, useState} from "react";
import axios from "axios";
import HttpService from '../../services/HttpService';

export const useFetch = <T>(url: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<T>();

	useEffect(() => {
		let unmounted = false;
		const source = axios.CancelToken.source();

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				setData(await HttpService.get<T>(url, source.token))
			} catch (error) {
				if (!unmounted) setIsError(true);
			}

			if (!unmounted) setIsLoading(false);
		};

		if(!url.includes('undefined')) fetchData();

		// For cleanup
		return () => {
			unmounted = true;
			source.cancel('Cancelling in cleanup');
		}
	}, [url]);
	return {data, isLoading, isError};
};