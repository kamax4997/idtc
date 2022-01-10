import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import Product from 'app/components/product'
// eslint-disable-next-line
import { IProduct, IReview } from 'utils/types/dashboard'
import CustomModal from 'app/@core/modal'
import axios from 'utils/axios/axiosService'
import Loading from 'app/@core/loading'
import useProducts from 'app/hooks/useProducts'

const Dashboard: React.FC = () => {
  const { setProductsAction } = useProducts()

  const [products, setProducts] = useState<IProduct[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [productId, setProductId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleReviewModal = useCallback(() => {
    setModalOpen(!modalOpen)
  }, [modalOpen, setModalOpen])

  const openReviewModal = (pId: string) => {
    setModalOpen(true)
    setProductId(pId)
  }

  const productsGroup = useMemo(() => {
    const group: React.ReactNode[] = []

    products.forEach((product: IProduct) => {
      group.push(
        <Product
          key={product._id}
          product={product}
          openReviewModal={(pId: string) => openReviewModal(pId)}
        />
      )
    })

    return group
  }, [products])

  const addReview = (review: IReview) => {
    setTimeout(async () => {
      const response = await axios.post('/api/v1/reviews/', review)
      
      if (response.data) {
        setProducts(response.data)
        setProductsAction(response.data)
        toast.success("LGU created successfully!")
        toggleReviewModal()
      } else {
        toast.error("Something went wrong!")
      }
    }, 1000)
  }
  
  useEffect(() => {
    setIsLoading(true)
    async function getProducts() {
      try {
        const response = await axios.get('/api/v1/products/')
        setProducts(response.data.products)
        setProductsAction(response.data.products)
        setIsLoading(false)
      } catch (error) {
        toast.error("Failed to fetch products!")
      }
    }

    getProducts()
  }, [setProducts])

  const reviewModal = useMemo(() => (
    <CustomModal 
      modalOpen={modalOpen} 
      toggleReviewModal={toggleReviewModal}
      addReview={addReview}
      productId={productId} />
  ), [modalOpen, productId])

  return (
    <div className='dashboard'>
      <div className='dashboard__container'>
        <div className='dashboard__start'>
          <h1 className='dashboard__title'>Traditional Communication Services</h1>
          {/* eslint-disable-next-line */}
          <p className='dashboard__description'>IDT is a market leader in both retail and wholesale international voice and data services. Leveraging its numerous interconnects with leading Telecom operators globally, IDT has also become a leader in the delivery of airtime and data top-up services to consumers and service providers around the world.</p>
        </div>
        <div className='dashboard__content'>
          {isLoading ? <Loading /> : productsGroup}
        </div>
      </div>
      <div className='dashboard__modal'>
        {reviewModal}
      </div>
    </div>
  )
}

export default Dashboard
