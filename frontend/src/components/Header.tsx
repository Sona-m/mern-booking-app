import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignoutButton from './SignoutButton';


const Header = () => {
    const { isLoggedin } = useAppContext();

    return (
        <div className="bg-pink-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold">
                    <Link to={'/'}>TravellaStay.com</Link>
                </span>
                {isLoggedin ? <span className='flex gap-5'>
                    <Link to={'/my-bookings'} className="flex text-white font-bold items-center  px-3 py-1 hover:bg-pink-500 ">My Bookings</Link>
                    <Link to={'/hotels'} className="flex text-white font-bold items-center  px-3 py-1 hover:bg-pink-500" >My Hotels</Link>
                    <SignoutButton />
                </span> :
                    <span>
                        <Link to={'/login'} className="flex text-pink-800 font-bold items-center flex px-3 py-1 bg-white">Sign In</Link>
                    </span>
                }
            </div>
        </div>
    )
}

export default Header;