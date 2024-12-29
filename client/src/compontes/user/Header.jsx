import React from 'react'

export const Header = () => {
  return (
    <div className="flex justify-between  items-center  px-36 h-20">
       <h1 className='text-lg font-semibold py-9' >
        FOOD <span className='text-red-500'>EAT</span>
        
        </h1>
       <div  className='flex justify-center items-center gap-10'>
        <nav>
          <ul className='flex justify-center items-center gap-5' >
          <li>Home</li>
            <li>menu</li>
            <li>About</li>
            <li>pages</li>
          </ul>

        </nav>
        <div>
          <button>Login</button>
        </div>
       </div>
    </div>
  )
}
