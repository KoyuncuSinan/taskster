
import { decrement, increment } from '@/store/slice'
import { RootState } from '@/store/store'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div>
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  </div>
  )
}
