import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useForm, NestedValue } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
// eslint-disable-next-line
import { IProduct, IReview } from 'utils/types/dashboard'
import useProducts from 'app/hooks/useProducts'

interface ICustomModalProps {
  productId: string
  modalOpen: boolean
  toggleReviewModal: () => void
  addReview: (review: IReview) => void
}

const defaultReview = { 
  productId: '', 
  reviewer: '', 
  content: '', 
  rating: 0 
}

const CustomModal: React.FC<ICustomModalProps> = (props: ICustomModalProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IReview>({
    defaultValues: defaultReview,
  })
  const { products } = useProducts()

  const { modalOpen, toggleReviewModal, productId, addReview } = props
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerContent, setReviewerContent] = useState('')
  const [currentProduct, setCurrentProduct] = useState<IProduct>(products[0])

  const [rating, setRating] = React.useState(0)
  
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const onSubmit = handleSubmit((data) => {
    data.productId = productId
    data.rating = rating / 20
    addReview(data)
  })

  const reviewOptions = {
    reviewer: {
      required: 'Name is required',
      onChange: (e: React.FormEvent<HTMLInputElement>) => {
        setReviewerName(e.currentTarget.value)
      },
    },
    content: {
      onChange: (e: React.FormEvent<HTMLInputElement>) => {
        setReviewerContent(e.currentTarget.value)
      },
    },
  }

  useEffect(() => {
    const results = products.filter((product: IProduct) => {
      return product._id === productId
    })
    console.log(results)
    setCurrentProduct(results[0])
  }, [setCurrentProduct, productId])

  return (
    <Modal
      className='custom-modal'
      ariaHideApp={false}
      isOpen={modalOpen}
    >
      <div className='custom-modal__container'>
        <div className='custom-modal__product-info'>
          <div className='product-info__img'>
            <img src={currentProduct && currentProduct.img} alt='Product Image' />
          </div>
          <div className='product-info__name'>
            <h3>{currentProduct && currentProduct.name}</h3>
          </div>
          <div className='product-info__description'>
            <p>{currentProduct && currentProduct.description}</p>
          </div>
        </div>
        <div className='custom-modal__product-review'>
          <form onSubmit={onSubmit}>
            <input 
              type='hidden'
              value={productId}
              // {...register('productId', reviewOptions.productId)}
            />
            <div className='product-review__name'>
              <input 
                type='text' 
                className='reviewer-name__field' 
                placeholder='Reviewer'
                value={reviewerName}
                {...register('reviewer', reviewOptions.reviewer)}
                required />
              <label htmlFor='name' className='reviewer-name__label'>Your Name</label>
            </div>
            <div className='product-review__rating'>
              <label className='reviewer-rating__label'>Your Rating</label>
              <br />
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={20}
                transition
                fillColor='orange'
                emptyColor='gray'
              />
            </div>
            <div className='product-review__review'>
              <input 
                type='text' 
                className='reviewer-review__field' 
                placeholder='Content'
                value={reviewerContent}
                {...register('content', reviewOptions.content)}
              />
              <label htmlFor='review' className='reviewer-review__label'>Your Review</label>
            </div>
            <div className='product-review__actions'>
              <button className='btn__save' type='submit'>Save</button>
              <button className='btn__close' onClick={toggleReviewModal}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default CustomModal
