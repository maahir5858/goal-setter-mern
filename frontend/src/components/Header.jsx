import React, { use } from 'react'
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Goal_Setter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                    </>
                )}
                
            </ul>
        </header>
    )
}

export default Header