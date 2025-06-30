import React from 'react'

const Button = ({name,onClick,className}) => {
  return (
    <div>
      <button className={`bg-purple-300 border-purple-600 border-2 rounded-full py-2 ${className}`} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button