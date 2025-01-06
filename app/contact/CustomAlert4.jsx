import React from 'react';
import styles from './CustomAlert4.module.css'; // Import CSS module for styling

const CustomAlert = ({ message, buttonText, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={onClose}>{buttonText}</button>
      </div>
    </div>
  );
};

export default CustomAlert;
