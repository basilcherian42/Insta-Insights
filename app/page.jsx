'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from './components';
import { Footer, Header, AboutPage, Blog } from './containers';
import Services from './Services/page';
import { getSession, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession(); //if its false--guest mode, if its true-- logged in user mode

  return (
        <div className="App">
          <div className="gradient__bg">
            <Header />
            <AboutPage />
            <Blog/>
           <Footer/>
          </div>
        </div>
  );
}

