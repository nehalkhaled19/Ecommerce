import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let categoryData = createAsyncThunk('category/categoryData', async function () {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    return data.data
})
let categorySlice = createSlice({
    name: 'category',
    initialState: { list: [] },
    reducers:{},
    extraReducers: (bulider) => {
        bulider.addCase(categoryData.fulfilled, (state, action) => {
            state.list = action.payload
        });

    }
})
export default categorySlice.reducer
