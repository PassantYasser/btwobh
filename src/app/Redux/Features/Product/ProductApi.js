import API from "../../Api/axios"

export const getProduct = async (params) => {
  const queryParams = {};
  if (params?.page) queryParams._page = params.page;
  if (params?.limit) queryParams._limit = params.limit;

  const response = await API.get('/products', { params: queryParams });
  const products = response.data;
  const total = response.headers['x-total-count']
    ? parseInt(response.headers['x-total-count'], 10)
    : products.length;

  return {
    products,
    total,
  };
}

export const AddProduct = async(formData)=>{
  const response = await API.post('/products' , formData)
  return response.data
}

export const EditProduct = async ({ id, formData }) => {
  const response = await API.put(`/products/${id}`, formData);

  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async ({ id }) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};