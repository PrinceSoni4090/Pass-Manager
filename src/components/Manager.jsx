import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

  }, [])

  const copyText = (text) => {
    toast.success(' Copied to clipboard!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setpasswordArray([...passwordArray, {...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4() }]))
    console.log(passwordArray)
    setform({ site: "", username: "", password: "" })
    toast.success(' Password saved!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }
  else {
    toast ('Error: Password not saved!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    // toast ('Error : Password not saved!')
  }
}

  const deletePassword = (id) => {
    let c = confirm ("Do you really want to delete this password?")
    if (c) {
    console.log("deleting password with id", id )
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast.success(' Password deleted!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    }
  }
  const editPassword = (id) => {
    console.log("Editing password with id", id )
    setform(passwordArray.filter(i=>i.id=== id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-blue-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="p-2 md:p-0 md:mycontainer min-h-[87.1vh] ">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-700'>  &lt;</span>
          Pass
          <span className='text-green-700'> Manager/&gt;</span></h1>
        <p className='text-green-700 text-lg text-center'>Your own password manager</p>
        <div className=' flex flex-col p-4 text-black gap-8 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-700 w-full px-4 py-1' type="text" name="site" id="site" />
          
          <div className="flex flex-col  md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-700 w-full px-4 py-1' type="text" name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-700 w-full px-4 py-1' type="password" name="password" id="password" />
              <span className='absolute right-[3px] top-[1px] cursor-pointer' onClick={showPassword} >
                <img ref={ref} className='p-1' width={32} src="/icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-400 gap-2 rounded-full px-8 py-2 w-fit'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-slate-700 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-slate-300'>

                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className=' py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank' >{item.site}</a>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.password} </span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'> 
                      <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-2'onClick={()=>{deletePassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
