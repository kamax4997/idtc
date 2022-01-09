export interface IProduct {
  id: number
  name: string
  description: string
  img?: string
  overall: number
  link: string
  reviews: IReview[]
}

export interface IReview {
  reviewer: string
  content?: string
  rating: number
}
