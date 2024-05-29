import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-700'>  &lt;</span>
          Pass
          <span className='text-green-700'> Manager/&gt;</span>
          </div>
      <ul>
        {/* <li  className='flex gap-4' >
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a  className='hover:font-bold'href="#">Contacts</a>
        </li> */}
      </ul>
      <button
          className='text-white bg-slate-500 my-5 rounded-full flex justify-center items-center ring-slate-400 ring-1'
          onClick={() => window.open("https://github.com/PrinceSoni4090/passop")}>

          <img className='invert w-10 p-1 px-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-3'>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
