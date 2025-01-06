'use client';
import React from 'react';
import './aboutpagecomp.css';
import {motion} from 'framer-motion';
import { fadeIn } from '../../variants'; 

const AboutPageComp = ({ title, text }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="gpt3__features-container_feature-text">
      <motion.p variants={fadeIn ("up", 0.1)}
      initial ="hidden"
      whileInView={"show"}
      viewport={{once: false, amount: 0.1}} >{text}</motion.p>
    </div>
  </div>
);

export default AboutPageComp;