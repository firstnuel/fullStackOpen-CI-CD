import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const type = 'text'
  const reset = () => setValue('')

  return {
    reset,
    name,
    type,
    value,
    onChange,
    'aria-label': name,
    'data-testid': name,
    required: true
  }
}
