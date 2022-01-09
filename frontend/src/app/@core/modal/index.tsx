import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm, NestedValue } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
// eslint-disable-next-line
import { IReview } from 'utils/types/dashboard'

interface ICustomModalProps {
  productId: string
  modalOpen: boolean
  toggleReviewModal: () => void
  addReview: (review: IReview) => void
}

const CustomModal: React.FC<ICustomModalProps> = (props: ICustomModalProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IReview>({
    defaultValues: { productId: '', reviewer: '', content: '', rating: 0 },
  })

  const { modalOpen, toggleReviewModal, productId, addReview } = props
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerContent, setReviewerContent] = useState('')

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

  return (
    <Modal
      className='custom-modal'
      ariaHideApp={false}
      isOpen={modalOpen}
    >
      <div className='custom-modal__container'>
        <div className='custom-modal__product-info'>
          <div className='product-info__img'>
            {/* eslint-disable-next-line */}
            <img src='https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bossrevolutionlogo.svg' alt='Product Image' />
          </div>
          <div className='product-info__name'>
            <h3>Boss Revolution</h3>
          </div>
          <div className='product-info__description'>
            {/* eslint-disable-next-line */}
            <p>Enjoy cheap calls to more than 200 countries and send international mobile top-ups to your friends and family back home.</p>
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
