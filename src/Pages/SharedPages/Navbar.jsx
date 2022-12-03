import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvide';
import useAdmin from '../../Hook/useAdmin';
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {

    const { user, userSignOut } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const [realUser, setRealUser] = useState()
    const [isAdmin, isSeller, isBuyer] = useAdmin(realUser);
    useEffect(() => {
        fetch(`http://localhost:5000/users-email?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setRealUser(data[0]))
    }, [user?.email])



    const handleSingOut = () => {
        userSignOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const profileToggle = () => {
        setToggle(s => !s);
    }


    const navItems =
        <>
            <li>
                <Link to='login' className='flex p-4 leading-none hover:outline justify-start hover:outline-3 hover:outline-white  flex-col gap-0'>
                    <p className='text-[12px] w-[66px]'>Returns &</p>
                    <p className='p-0 text-[18px] w-[66px]'>Orders </p></Link>
            </li>
            <li>
                <Link className='flex items-end hover:outline-3  hover:outline-white ' to='/'>
                    <div className="indicator">
                        <span className="indicator-item badge bg-orange-500 badge-secondary">0</span>
                        <FaShoppingCart className='h-10 w-10' />
                    </div>
                    <p className='-ml-2'>Card</p>
                </Link>
            </li>
            {!user?.uid ?
                ""
                :
                <>
                    {isAdmin ?
                        <li><Link className=' hover:outline-3 hover:outline-white ' to='../dashboard/buyers'>Dashboard</Link></li>
                        : (isBuyer) ?
                            <li><Link className=' hover:outline-3 hover:outline-white ' to='../dashboard/my-orders'>Dashboard</Link></li>
                            : isSeller &&
                            <li><Link className=' hover:outline-3 hover:outline-white ' to='../dashboard/my-product'>Dashboard</Link></li>
                    }
                </>


            }
        </>

    const navItems2 =
        <>
            <li className='hover:outline hover:outline-1 hover:outline-white'><Link to='/'>Buy Again</Link></li>
            <li className='hover:outline hover:outline-1 hover:outline-white'><Link to='/'>Customer Service</Link></li>
            <li className='hover:outline hover:outline-1 hover:outline-white'><Link to='/'>Gift Cards</Link></li>
            <li className='hover:outline hover:outline-1 hover:outline-white'><Link to='/blog'>Sell</Link></li>
        </>
    return (
        <div>
            <div className="mx-auto max-w-[1440px]  px-[3%] bg-[#0d1117]">
                <div className=" bg-base-100">
                    <div className="navbar justify-between md:hidden bg-[#0d1117] ">
                        {/* mobile */}
                        <Link to='/' className="flex normal-case text-2xl font-bold items-center">
                            <img className='w-12' src="https://i.ibb.co/94BJMdM/logo.png" alt="" />
                            <p className='w-84'>Aspen Home</p>
                        </Link>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact right-10 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black text-4xl">
                                {navItems}
                                <li>
                                    {user?.uid ?
                                        <>

                                            <button onClick={handleSingOut} className=''  >Sign out</button>

                                        </>
                                        :
                                        <Link to='login' className="btn text-white  border-0 bg-orange-500">Create Account</Link>}
                                </li>
                            </ul>
                        </div>
                        <>
                            {user?.uid &&
                                <>
                                    <div className="avatar " onClick={profileToggle}>
                                        <div className="w-10 mt-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photoURL} alt='user' />
                                        </div>
                                    </div>
                                    <ul id='profile' className={`"absolute z-50 top-24 right-0 left-0 menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full mt-4" 
                        ${toggle ? 'absolute' : "hidden"}`}>
                                        {user?.displayName &&
                                            <li className='z-50'><Link>{user?.displayName}</Link></li>
                                        }
                                        <li><Link>View Profile</Link></li>
                                        <li className='z-50'>
                                            <button onClick={handleSingOut} className=''  >Sign out</button>
                                        </li>
                                    </ul>
                                </>}
                        </>
                    </div>
                    {/* desktop   */}
                    <div className=' hidden justify-between md:flex items-center  bg-[#0d1117] text-[#fff]'>
                        <div className='flex items-center'>
                            <img className='w-12' src="https://i.ibb.co/94BJMdM/logo.png" alt="" />
                            <p className='w-[144px]'>Aspen Home</p>
                        </div>
                        <div className="form-control pl-5 w-full">
                            <label className="input-group">
                                <input className="input w-full focus:outline-offset-0 focus:outline-state-none  text-orange-500 focus:outline-orange-500 " type="text" placeholder="search" />
                                <span className='bg-orange-500'><FaSearch /></span>
                            </label>
                        </div>
                        <div className='ml-4'>
                            {user?.uid ?
                                <div className='z-50'>
                                    <div className="avatar " onClick={profileToggle}>
                                        <div className="w-10 mt-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photoURL} alt='user' />
                                        </div>
                                    </div>
                                    <ul id='profile' className={`" absolute  top-20 right-20 menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4" 
                        ${toggle ? 'absolute z-50' : "hidden"}`}>
                                        {user?.displayName &&
                                            <li><Link>{user?.displayName}</Link></li>
                                        }
                                        <li><Link>View Profile</Link></li>
                                        <li>
                                            <button disabled>
                                                <span>{
                                                    isAdmin ? "Admin" :
                                                        isBuyer ? "User" :
                                                            isSeller && "Seller"
                                                }</span> 🔥
                                            </button>
                                            <button onClick={handleSingOut} className=''  >Sign out</button>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <ul>
                                    <li>
                                        <Link to='login' className='flex p-4 leading-none hover:outline justify-start hover:outline-3 hover:outline-white  flex-col gap-0'>
                                            <p className='text-[12px] w-[126px]'>Hello, sing up </p>
                                            <p className='p-0 text-[18px]'>Account & List </p></Link>
                                    </li>
                                </ul>
                            }
                        </div>
                        <div className=" hidden mx-4 md:flex">
                            <ul className="menu menu-horizontal py-2 ">
                                {navItems}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className="drawer h-[65px]">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <div className="navbar bg-gray-800 text-gray-200">
                            <div className="flex-none">
                                <ul className="menu menu-horizontal p-0 ">
                                    <li><label htmlFor="my-drawer" className="hover:outline-1 hover:outline hover:outline-white drawer-button">All</label></li>
                                    {navItems2}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer" className="drawer-overlay "></label>
                        <ul className="menu p-4 w-80 bg-base-100 rounded-md text-base-content absolute">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;