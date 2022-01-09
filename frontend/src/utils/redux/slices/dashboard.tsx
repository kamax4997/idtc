import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'utils/redux/store'
// eslint-disable-next-line
import { IProduct } from 'utils/types/dashboard'

const initialState = {
  products: []
}

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products
    },
    clearProducts(state) {
      state.products = []
    },
  },
})

// Reducer
export default slice.reducer

export function setProducts(products: IProduct[]) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.setProducts({
      products: products,
    }))

    return true
  }
}

export function clearProducts() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.clearProducts())
    return true
  }
}
