import { assets} from "../assets/assets"
import { useAppContext } from "../../context/AppContext"

const Navbar = () => {

  const { token, navigate} = useAppContext()
  return (
   <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 sm:pb-3 sm:pt-6 border-b border-gray-300 ">
    <div className='flex gap-2 items-center text-2xl'>
    <img src={assets.logo} alt="logo" className='w-8 sm:w-10 cursor-pointer' />
     <strong className="pt-1">AyushDocs</strong>
    </div>
    <div>
      <button
      onClick={() => navigate("/admin")}
       className="cursor-pointer flex justify-center items-center gap-2 px-6 py-1.5  transition rounded-3xl text-white bg-primary hover:bg-primary-dull">
       {
        token ?  "Dashboard" : "Admin Login"
       }
        <img src={assets.arrow} alt="arrow" className='w-3' />
      </button>
    </div>
   </nav>
  )
}

export default Navbar