import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddProduct, deleteProduct, EditProduct, getProduct, getProductById } from "./ProductApi";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (params, thunkAPI) => {
    try {
      const response = await getProduct(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const AddProductThunk = createAsyncThunk("products/AddProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await AddProduct(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const EditProductThunk = createAsyncThunk(
  "products/EditProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await EditProduct({ id, formData });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductByIdThunk = createAsyncThunk("products/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, thunkAPI) => {
    try {
      const response = await deleteProduct({ id});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    getProductById:null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      //getProductsThunk
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === 'object' && 'products' in action.payload) {
          state.products = action.payload.products;
          state.total = action.payload.total;
        } else {
          state.products = action.payload;
          state.total = action.payload?.length || 0;
        }
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //AddProductThunk
      .addCase(AddProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //EditProductThunk
      .addCase(EditProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(EditProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getProductByIdThunk
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getProductById = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //deleteProductThunk
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;