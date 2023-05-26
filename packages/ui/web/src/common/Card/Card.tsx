import { Button } from 'common/Button'
import { ReviewStars } from 'common/ReviewStars'
import { ReactElement, ReactNode } from 'react'

export interface CardProps {
  id: string
  name: string
  price: string
  imageUrl: string
  description?: string
  rating: number
  // renderProps: (id: string, imageUrl: string, alt: string) => JSX.Element
  renderProps: () => JSX.Element
}

export const Card = (props: CardProps) => {
  const {
    id,
    name,
    price,
    imageUrl,
    description = 'Lorem Ipsum dolor sit amet consectetur adipiscing elit. Nulla euismod nisl eget aliquam ultricies nunc nisl aliquet nunc sit amet nisl.',
    rating,
    renderProps,
  } = props

  return (
    <div
      className="w-full max-w-sm bg-white rounded-lg  
        transform hover:scale-105 transition-transform duration-300 shadow-md flex flex-col"
    >
      {/* <a href={id}> */}
      {renderProps()}
      {/* <img
        className="p-8 rounded-t-lg cursor-pointer w-full"
        src={imageUrl}
        alt={name}
      /> */}
      {/* </a> */}
      <div className="px-5 pb-5 flex flex-col gap-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {name}
        </h5>
        <h3>{description}</h3>
        <ReviewStars rating={rating} />
      </div>
      <div className="flex justify-between px-4 py-4 align-top h-full items-end">
        <span className="text-3xl font-bold text-gray-900 ">{price}</span>
        <Button>Add to card</Button>
      </div>
    </div>
  )
}
