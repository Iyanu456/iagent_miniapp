import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  body?: any; // Optional body field for request payload
}

const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (config: RequestConfig) => {
    const { url, method = 'GET', body = null, headers = {} } = config;
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data: body ? JSON.stringify(body) : null, // Serialize the body
        headers: {
          'Content-Type': 'application/json', // Ensure JSON content type
          ...headers,
        },
      });
      setData(response.data);
      console.log(response.data)
      return response.data; // Return response data
    } catch (err: any) {
      console.error('Axios Request Error:', err); // Log full error details
      setError(err?.response?.data?.message || err.message || 'An unknown error occurred');
      return null; // Return null on error
    } finally {
      setLoading(false);
    }
  };

  return { data, setData, loading, error, sendRequest };
};

export default useAxios;
