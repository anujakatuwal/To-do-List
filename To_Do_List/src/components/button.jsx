import React from 'react'

const Button = ({name,onClick,style}) => {
  return (
    <div>
      <button className="bg-purple-300 border-purple-600 border-2  rounded-full px-7 py-2" onClick={onClick} style={style}>{name}</button>
    </div>
  )
}

export default Button