/* eslint-disable react/prop-types */
// import React from 'react'

export default function Button({text, className, OnClick}) {
  return (
    <button onClick={OnClick} className={className}>
      {text}
    </button>
  )
}
