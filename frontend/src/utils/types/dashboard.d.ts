export interface IProduct {
  _id: string
  name: string
  description: string
  img?: string
  overall: number
  link: string
}

export interface IReview {
  productId: string
  reviewer: string
  content?: string
  rating: number
}
