import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CustomAlert.module.css';

const CustomAlert = ({ message, buttonText, buttonText2, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push('/login');
  };
  const handleBackToHome = () => {
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={handleBackToHome}>{buttonText2}</button>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default CustomAlert;
