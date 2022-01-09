import React from 'react'
import { Rating } from 'react-simple-star-rating'
// eslint-disable-next-line
import { IProduct } from 'utils/types/dashboard'

interface IProductProps {
  product: IProduct
  openReviewModal: (pId: number) => void
}

const Product: React.FC<IProductProps> = (props: IProductProps) => {
  const { product, openReviewModal } = props

  return (
    <div className='product'>
      <div className='product__container'>
        <div className='product__img'>
          <img src={product.img} alt='Product Image' />
        </div>
        <div className='product__name'>
          <p className='product__title'>
            <a href={product.link} target="_blank" rel="noreferrer">{product.name}</a>
          </p>
          <p className='product__description'>{product.description}</p>
          <div className='product__rating'>
            <Rating
              ratingValue={product.overall * 20}
              size={20}
              transition
              fillColor='orange'
              emptyColor='gray'
              readonly
            />
          </div>
        </div>

        <div className='product__actions'>
          <button type='button' onClick={() => openReviewModal(product.id)}>
            Add Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
