import clsx from 'clsx'
import React from 'react'

const Button = ({icon,type,label,className}) => {
  return (
    <div> 
        <button type={type || 'button'} className={clsx('rounded outline-none py-1 mt-2',className)}>
            <span>{label}</span>
            {icon && icon}
        </button>
    </div>
  )
}

export default Button