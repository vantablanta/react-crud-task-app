import React from 'react'

function Button({color, text, onAdd}) {

  return (
    <button className='btn' style={{backgroundColor: color}} 
        onClick={onAdd}>
        {text}        
    </button>
  )
}

export default Button