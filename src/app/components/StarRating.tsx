'use client'

type Props = {
  rating: number
}

export default function StarRating({ rating }: Props) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < rating ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  )
}
