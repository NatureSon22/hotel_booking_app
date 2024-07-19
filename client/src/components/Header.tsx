import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-blue-800 py-8 px-6 font-open">
        <div className="container mx-auto flex justify-between items-center max-w-[65em]">
            <p className="text-[1.2rem] md:text-[1.4rem] font-extrabold text-white font-fair cursor-pointer relative decor">
                <Link to="/">Booking</Link>
            </p>

            <div>
                <ul className="flex gap-2">
                    <Link className="text-white border md:text-[1rem] border-white/60 px-4 rounded-sm py-2 text-[0.9rem] cursor-pointer hover:bg-white hover:text-blue-800 apply-transition" to="/sign-in">Sign in</Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header