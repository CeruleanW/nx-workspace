import React from 'react'

export function ErrorMsg({ text, ...optionals }) {
  return (
    <div>Error! {text}</div>
  )
}
