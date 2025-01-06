'use client';
import Image from 'next/image';
import React from 'react';
import './header.css';
// for animation of elements to left or right (up and down as well)
import {motion} from 'framer-motion';
import { fadeIn } from '../../variants'; 
//for animation gif
import Lottie from 'lottie-react';
import animationData from '../../Animationhome.json';


const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <motion.h1 
      variants={fadeIn ("right", 0.2)}
      initial ="hidden"
      whileInView={"show"}
      viewport={{once: false, amount: 0.4}}  className="gradient__text">Redefining Instagram Analysis in a way never imagined
      </motion.h1>
      <motion.p
       variants={fadeIn ("left", 0.2)} //0.2 indicates lag period before it starts moving,the higher the value, latest it starts moving
       initial ="hidden"
       whileInView={"show"}
       viewport={{once: false, amount: 0.3}} //specifies the percentage of the element's height that must be visible  for the effect to be triggered, 0.1 indicates 10 percent
      > Empowering Instagram users through advanced fake account detection and insightful analytics. Navigate confidently, build genuine connections, and optimize your online presence.</motion.p>

    </div>
    <div className="gpt3__header-image">
<Lottie animationData={animationData}/> 
    </div>
  </div>
);

export default Header;