import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Product from 'app/components/product'
// eslint-disable-next-line
import { IProduct } from 'utils/types/dashboard'
import CustomModal from 'app/@core/modal'

const mockData = [
  {
    id: 1,
    name: 'Boss Revolution',
    // eslint-disable-next-line
    description: 'Enjoy cheap calls to more than 200 countries and send international mobile top-ups to your friends and family back home.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bossrevolutionlogo.svg',
    overall: 4,
    link: 'https://bossrevolution.com',
    reviews: [],
  },
  {
    id: 2,
    name: 'Boss Wireless',
    // eslint-disable-next-line
    description: 'Flexible talk, text, and data plans for big savings. Get the best value on domestic and international calling.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bosswirelesslogo.svg',
    overall: 5,
    link: 'https://bosswireless.com',
    reviews: [],
  },
  {
    id: 3,
    name: 'Idt Global',
    // eslint-disable-next-line
    description: 'Leading provider of international voice and SMS termination and strategic outsource partnerships for fixed and mobile operators globally.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/idtgloballogo.svg',
    overall: 2,
    link: 'https://idtglobal.com',
    reviews: [],
  },
  {
    id: 4,
    name: 'Idt Express',
    // eslint-disable-next-line
    description: 'IDT Express is a market leader in global Voice & DIDs servicing UCaaS, CPaaS, CCaaS and other industry segments.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/idtexpresslogo.svg',
    overall: 3,
    link: 'https://idtexpress.com',
    reviews: [],
  },
]

const Dashboard: React.FC = () => {
  // const dispatch = useDispatch()
  const [products, setProducts] = useState<IProduct[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [productId, setProductId] = useState(1)

  const toggleReviewModal = useCallback(() => {
    setModalOpen(!modalOpen)
  }, [modalOpen, setModalOpen])

  const openReviewModal = (pId: number) => {
    setModalOpen(true)
    setProductId(pId)
  }

  const productsGroup = useMemo(() => {
    const group: React.ReactNode[] = []

    products.forEach((product: IProduct) => {
      group.push(
        <Product
          key={product.id}
          product={product}
          openReviewModal={(pId: number) => openReviewModal(pId)}
        />
      )
    })

    return group
  }, [products])

  useEffect(() => {
    // switch (selectTab) {
    //   case 3:
    //     setElements([categoryMemo1, carouselRecommendMemo])
    //     break;
    //   default:
    //     setElements([categoryMemo1, carouselMemo1])
    //     break;
    // }

    setProducts(mockData)
  }, [])

  const reviewModal = useMemo(() => (
    <CustomModal 
      modalOpen={modalOpen} 
      toggleReviewModal={toggleReviewModal}
      productId={productId} />
  ), [modalOpen])

  return (
    <div className='dashboard'>
      <div className='dashboard__container'>
        <div className='dashboard__start'>
          <h1 className='dashboard__title'>Traditional Communication Services</h1>
          {/* eslint-disable-next-line */}
          <p className='dashboard__description'>IDT is a market leader in both retail and wholesale international voice and data services. Leveraging its numerous interconnects with leading Telecom operators globally, IDT has also become a leader in the delivery of airtime and data top-up services to consumers and service providers around the world.</p>
        </div>
        <div className='dashboard__content'>
          {productsGroup}
        </div>
      </div>
      <div className='dashboard__modal'>
        {reviewModal}
      </div>
    </div>
  )
}

export default Dashboard
