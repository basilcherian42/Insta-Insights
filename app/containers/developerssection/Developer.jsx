import React from 'react';
import Image from 'next/image';
import styles from './Developer.module.css'

const Developer = () => {
  return (
    <div className={styles.gradient_bg} id='developers'>
    <div className="flex justify-center mb-8">
      <div className="bg-black rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Developers</h1>
        <div className="flex">
          <div className="flex flex-col items-center mr-16">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image src="/basil.jpg" alt="Person 1" width={128} height={128} layout="responsive" className="rounded-full" />
            </div>
            <h2 className="text-lg font-bold">Contact Person 1</h2>
            <p className="text-sm">Email: person1@example.com</p>
            <p className="text-sm">Phone: 123-456-7890</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image src="/vinay.jpg" alt="Person 2" width={128} height={128} layout="responsive" className="rounded-full" />
            </div>
            <h2 className="text-lg font-bold">Contact Person 2</h2>
            <p className="text-sm">Email: person2@example.com</p>
            <p className="text-sm">Phone: 987-654-3210</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Developer;
