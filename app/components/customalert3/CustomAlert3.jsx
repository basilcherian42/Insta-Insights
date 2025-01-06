import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CustomAlert3.module.css';
import { useSession } from "next-auth/react";


const CustomAlert3 = ({ buttonText, onClick }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push('/Services');
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <p>Welcome, {session?.user?.name}</p>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default CustomAlert3;
