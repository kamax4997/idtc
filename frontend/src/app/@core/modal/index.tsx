import React, { useState } from 'react'
import Modal from 'react-modal'
import { Rating } from 'react-simple-star-rating'

interface ICustomModalProps {
  productId: number
  modalOpen: boolean
  toggleReviewModal: () => void
}

const CustomModal: React.FC<ICustomModalProps> = (props: ICustomModalProps) => {
  const { modalOpen, toggleReviewModal, productId } = props
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerReview, setReviewerReview] = useState('')

  const [rating, setRating] = React.useState(0)

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReviewerName(e.currentTarget.value)
  }

  const handleReviewChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReviewerReview(e.currentTarget.value)
  }
  
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <Modal
      className="custom-modal"
      ariaHideApp={false}
      isOpen={modalOpen}
    >
      <div className='custom-modal__container'>
        <div className='custom-modal__product-info'>
          <div className='product-info__img'>
            {/* eslint-disable-next-line */}
            <img src="https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bossrevolutionlogo.svg" alt='Product Image' />
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
          <div className='product-review__name'>
            <input 
              type="input" 
              className="reviewer-name__field" 
              placeholder="Name" 
              name="name" 
              id='name' 
              value={reviewerName}
              onChange={handleNameChange}
              required />
            <label htmlFor="name" className="reviewer-name__label">Your Name</label>
          </div>
          <div className='product-review__rating'>
            <label className="reviewer-rating__label">Your Rating</label>
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
              type="input" 
              className="reviewer-review__field" 
              placeholder="Review" 
              name="review" 
              id='review' 
              value={reviewerReview}
              onChange={handleReviewChange}
              required />
            <label htmlFor="review" className="reviewer-review__label">Your Review</label>
          </div>
        </div>
        <div className='product-review__actions'>
          <button className='btn__save' onClick={toggleReviewModal}>Save</button>
          <button className='btn__close' onClick={toggleReviewModal}>Close</button>
        </div>
      </div>
    </Modal>
  )
}

export default CustomModal
