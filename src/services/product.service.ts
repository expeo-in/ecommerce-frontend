import useAuthStore from "../admin/auth-store";
import httpClient, { useProtectedHttpClient } from "./api-client";

class ProductService {
  apiEndpoint: string = "api/products";
  user = useAuthStore();

  getAll() {
    return httpClient.get(this.apiEndpoint);
  }

  getById(id: any) {
    return httpClient.get(this.apiEndpoint + "/" + id);
  }

  create(formData: any) {
    // const protectedHttpClient = useProtectedHttpClient();
    // protectedHttpClient.post(this.apiEndpoint, formData);
    //httpClient.defaults.headers.Authorization = "";
    return httpClient.post(this.apiEndpoint, formData);
  }

  update(id: number, formData: any) {
    // const protectedHttpClient = useProtectedHttpClient();
    // return protectedHttpClient.put(this.apiEndpoint + "/" + id, formData);

    return httpClient.put(this.apiEndpoint + "/" + id, formData);
  }
}

export default ProductService;
