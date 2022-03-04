import { AxiosInstance, AxiosResponse } from "axios";
import baseRepositorie from "../baseResource";
import { Product } from "../../types/Products";

const BaseUrl = "/products";

const actions = (client: AxiosInstance) => ({
  getOne: (handle: string) => {
    return client.get<Product>(`${BaseUrl}/${handle}`);
  },
});

export default baseRepositorie(BaseUrl, actions);
