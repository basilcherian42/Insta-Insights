'use client';
import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FiLoader } from 'react-icons/fi'; // Import FiLoader icon
import logo from '../../../public/logo.svg';
import './navbar.css';
import Image from 'next/image';
import Link from 'next/link'
import AboutPage from '../../containers/aboutpage/AboutPage';
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  
    const [toggleMenu, setToggleMenu] = useState(false);
    const { data: session, status } = useSession();
    const [loggingOut, setLoggingOut] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
      try {
        setLoggingOut(true); // Start the logging out process
        await signOut({ callbackUrl: '/' });
        // Additional logic if needed after logout
        router.push('/'); // Redirect to the home page after logout
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setLoggingOut(false); // Stop the logging out process
      }
    };
    
    const scrollToAboutUs = () => {
      const aboutUsDiv = document.getElementById('aboutusdiv');
      if (aboutUsDiv) {
          aboutUsDiv.scrollIntoView({ behavior: 'smooth' });
      }
  };

    return (
      <div className="gpt3__navbar gradient__bg">
        <div className="gpt3__navbar-links">
          <div className="gpt3__navbar-links_logo">
          <Link href="../">   <Image
        src='/logotr.png'// Replace with your image path
        width={170}
        height={170}
        alt="My Image Description" // Provide a descriptive alt text
        /></Link><br/> 
            {/* <span style={{ color: '#FF69B4', fontSize: '18px', fontWeight: 'bold' }}>InstaInsight</span> Add the InstaInsight text */}

        </div>
          <div className="gpt3__navbar-links_container">
            <p><Link href="../">Home</Link><br/></p> 
         <p><a href="#aboutusdiv" onClick={scrollToAboutUs}>About Us</a></p>
          <p><Link href="./Services">Services</Link></p>
          <p><Link href="./contact">Contact</Link></p>
            <p><a href="#blog">Blog</a></p>
            <p><a href="#footer">Developers</a></p>
          </div>
        </div>
        {!session ? (
        <div className="gpt3__navbar-sign">
       <p><Link href="./login">Sign In</Link></p>
         <button type='button'> <Link href="./register">Sign up</Link><br/></button> 
        </div>
        ) : (
        <div>
            <p>Welcome, {session?.user?.name}</p>
            <p>Email: {session?.user?.email}</p>
            <button 
              type="button" 
              className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
              disabled={loggingOut} // Disable the button while logging out
            >
              {loggingOut ? (
                <><FiLoader className="animate-spin mr-2" /></>
              ) : (
                <Link href="/">Logout</Link>
              )}
            </button>
        </div>
      )}
        <div className="gpt3__navbar-menu"> 
          {toggleMenu   
            ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />} {/*This code is to trigger the menu option to enlarge when clicked */}
          {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p><a href="./">Home</a></p>
              <p><a href="#aboutusdiv" onClick={scrollToAboutUs}>About Us</a></p>
              <p><Link href="./Services">Services</Link></p>
              <p><Link href="./contact">Contact</Link></p>
              <p><a href="#blog">Blog</a></p>
              <p><a href="#footer">Developers</a></p>
            </div>
            {!session && (
                            <div className="gpt3__navbar-menu_container-links-sign">
                                <p><Link href="./login">Sign In</Link></p>
                                <button type='button'> <Link href="./register">Sign up</Link><br/></button>
                            </div>
                        )}
          </div>
          )}
        </div>
      </div>
    );
  };
  
export default Navbar;
