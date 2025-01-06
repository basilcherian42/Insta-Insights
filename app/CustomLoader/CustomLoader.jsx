import React, { useState, useEffect } from 'react';
import styles from './CustomLoader.module.css';
import Lottie from 'lottie-react';
import animationData from '../loader.json';
import TextAnimation from './TextAnimation';

const CustomLoader = () => {

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Lottie animationData={animationData}/>
        <TextAnimation />

      </div>
    </div>
  );
};

export default CustomLoader;
