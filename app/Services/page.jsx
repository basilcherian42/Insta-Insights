'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CustomAlert from '../components/customalert/CustomAlert';
import MultipleFlipCards from '../FlipCard/MultipleFlipCards';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const Services = () => {
  // const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const COLORS_TOP = ["#FF69B4", "#800080", "#FF0000", "#FFA500"];

  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #1a023f 50%, ${color})`;


  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <CustomAlert
        message="Please sign in to access the services page."
        buttonText2="Back to Home"
        buttonText="OK, Let's Go to Signin Page"
      />
    );
  }

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="absolute top-1 left-0 w-full flex items-center justify-center z-10">
        <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Explore all that we have to offer
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center justify-center gap-8 z-10">
        
       
    

         {/* Caption Generator Button */}
         {/* <Link href="/captiong">
         <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex items-center justify-center gap-1.5 rounded-full bg-gray-950/10 px-6 py-3 text-xl text-gray-50 transition-colors hover:bg-gray-950/50 sm:w-auto sm:max-w-[500px] md:w-[400px] h-[60px]" >        
        
          Caption Generator
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
        </Link> */}
      </div>

      {/* Canvas with Stars */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <MultipleFlipCards />
    </motion.section>
  
  );
};
export default Services;