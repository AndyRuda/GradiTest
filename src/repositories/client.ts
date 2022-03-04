import axios from 'axios';

/* Base domain for all request */ 
export const baseURL = `https://graditest-store.myshopify.com`;

/* Base Header */
const Baseheaders = {
  Accept: 'application/json',
};

/* Config Client*/
const client = axios.create({
  baseURL: baseURL,
  headers: Baseheaders,
});

client.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default client;
