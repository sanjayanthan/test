"use client"
import Link from "next/link"


const Header = () => {
  
   const dropdownLavel=()=>{

   }
   const handleSidebar=()=>{
      
   }
   const handleLogout=()=>{

   }
  return (
    <nav>
    <div className='px-2  border-b-2 border-blue-600  flex flex-row justify-between items-center cursor-pointer'>
      <span></span>
    <h3 className='text-lg text-gray-500 font-bold '></h3>
    <div className='flex justify-end mr-10  my-1'>
<button onClick={dropdownLavel} id="dropdownHoverButton" data-dropdown-toggle="dropdownprofile" data-dropdown-trigger="hover" class="text-white" type="button">
  <Link href='/'>
<img src={"/assets/user.png"} className='w-10 h-10  cursor-pointer'/>
</Link>
</button>

<div id="dropdownprofile" style={{marginTop:'1rem',marginLeft:'3rem',width:'200px'}} class=" hidden bg-white divide-y divide-gray-100 rounded-lg shadow  ">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200 px-2 "  aria-labelledby="dropdownHoverButton">
      <li onClick={()=>{}}>
        <p class="block px-1 py-2 hover:bg-gray-600 font-semibold">Sanjay</p>
      </li>
      <li onClick={handleLogout} className='flex hover:bg-gray-600  px-4 justify-start items-center'>
        <p class="block py-2 h  pl-2">Logout</p>
      </li>
      
    </ul>
</div>

      </div>
  </div>
  
  </nav>
  )
}

export default Header