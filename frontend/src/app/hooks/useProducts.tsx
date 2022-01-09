import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from 'utils/redux/slices/dashboard'
import { IRootState } from 'utils/redux/store'
// eslint-disable-next-line
import { IProduct } from 'utils/types/dashboard'

// eslint-disable-next-line
const useProducts = () => {
  const dispatch = useDispatch()

  const { products } = useSelector(
    (state: IRootState) => state.dashboard,
  )

  return {
    products,

    setProductsAction: (params: IProduct[]) => dispatch(
      setProducts(params),
    ),
  }
}

export default useProducts
