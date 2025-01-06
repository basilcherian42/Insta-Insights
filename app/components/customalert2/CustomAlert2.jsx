import React from 'react'
import styles from './CustomAlert2.module.css';
import { useRouter } from 'next/navigation';

const CustomAlert2 = ({ message, buttonText,  onClose}) => {
    
      return (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p>{message}</p>
            <button onClick={onClose}>{buttonText}</button>
          </div>
        </div>
      );
}

export default CustomAlert2