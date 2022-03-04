
  
import { AxiosInstance } from 'axios';
import customClient from './client';

const createResource =
  (client: AxiosInstance) =>
  <T>(BaseUrl: string, actions: (client: AxiosInstance) => T) => {
    const resource = {};
    return { ...resource, ...actions(client) };
  };

export default createResource(customClient);