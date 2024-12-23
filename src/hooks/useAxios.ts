import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  body?: any; // Optional body field to support request payload
}

const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to trigger the Axios request on demand
  const sendRequest = async (config: RequestConfig) => {
    const { url, method = 'GET', body = null, headers = {} } = config;
    setLoading(true);
    setError(null); // Reset error before a new request

    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers,
      });
      setData(response.data);
      return response.data; // Return the response data directly
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred'); // Provide a structured error message
      return null; // Return null in case of error
    } finally {
      setLoading(false);
    }
  };

  return { data, setData, loading, error, sendRequest };
};

export default useAxios;
