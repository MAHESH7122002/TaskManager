import React from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Label } from 'recharts';
const Textbox = React.forwardRef(({
    placeholder,type,name,label,className,register,error
},ref)=>{
    return (
        <div className='w-full flex flex-col gap-2'>
            {label && (
                <label htmlFor={name} className='text-slate-800 text-left ml-2.5'>{label}
                </label>
            )}
            <div>
                <input type={type} placeholder={placeholder} ref={ref} name={name}
                {...register} aria-invalid={error?"true":"false"} className={clsx("bg-transparent px-3  py-2.5 2xl:py-2 border border-gray-300 placeholder-gray-300 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",className)}/>
            </div>
            {error && (
                <span className='text-xs text-red-500 mt-0.5'>{error}</span>
            )}
        </div>
    )

})

export default Textbox