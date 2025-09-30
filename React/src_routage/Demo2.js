import React from 'react'

const Demo2 = ({props,children}) => {
  return (
    <div className='container  mx-auto w-75 my-4'>
         <h2>{props.title}</h2>
        {children}
    </div>
  )
}

export default Demo2