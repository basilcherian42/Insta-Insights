'use client'
import React, { useEffect, useState } from 'react';
import styles from './fake.module.css'; 
import Chart, { ChartConfiguration } from 'chart.js/auto'; // Import Chart.js
import animationData1 from '../loadinganimation.json'; 
import animationData2 from '../dangeranimation.json';
import animationData3 from '../oopsanimation.json';
import animationData4 from '../realanimation.json';
import Lottie from 'lottie-react';

declare global {
  interface Window {
    myChart?: Chart;
  }
}

function Index() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('Enter username and click submit');
  const [loading, setLoading] = useState(false);
  const [feature_importance, setFeature] = useState(false);
  const [profileData, setProfileData] = useState(null); // Add state for profile data
  const [imageURL, setImageURL] = useState<string | null>(null); 

  useEffect(() => {
    if (feature_importance) {
      createChart();
    }
  }, [feature_importance]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/predict/${encodeURIComponent(username)}`);
      const data = await response.json();

      setMessage(data.message);
      setFeature(data.feature_importance);
      setProfileData(data.data); 
      setImageURL(`http://localhost:8080/get_image/${encodeURIComponent(username)}`); // Set image URL
      
    } catch (error) {
      setMessage('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const createChart = () => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    if (window.myChart instanceof Chart) {
      window.myChart.destroy(); // Destroy the existing chart
    }

    if (!feature_importance) return;

    const featureNames = Object.keys(feature_importance);
    const importanceValues = Object.values(feature_importance);

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: featureNames,
        datasets: [{
          label: 'Feature Importance',
          data: importanceValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    window.myChart = new Chart(ctx, chartConfig);
  };
  
  return (
    <div className={styles.gradient__bg}>
      <div className="max-w-lg mx-auto p-6">
        <div className={styles.heading}>
        <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-lg font-medium leading-tight text-transparent sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight mb-4 p-4">
              Bot Detection
            </h1>
        </div>
        <div className="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-lg bg-gradient-to-br from-gray-500  text-center text-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semi-bold mb-2"style={{ fontFamily: 'var(--font-family)' }} htmlFor="username">
              Enter Instagram Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ fontFamily: 'var(--font-family)' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-violet-500 text-white px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-black hover:text-white"
              type="submit"
              disabled={loading}
              style={{ fontFamily: 'var(--font-family)' }}
            >
              Submit
            </button>
          </div>
        </form>
        </div>
        <div className="text-center mt-4">
          {loading ? (
           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
           <div className="inline-block bg-black bg-opacity-50 z-50 px-4 py-2 rounded-md text-gray-700">
             <Lottie animationData={animationData1} width={30} height={30} />
           </div>
         </div>
          ) : (
            <div className={`mt-4 text-center text-lg font-semibold ${message.includes('Real') ? 'text-green-500' : 'text-red-500'}`} style={{ fontFamily: 'var(--font-family)' }}>
                {message}
                {message.includes('Real') && (
                <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '200px', height: '200px' }}>
                    <Lottie animationData={animationData4} loop={2}/>
                  </div>
                </div>
               )}
                {message.includes('Fake') && (
                <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '200px', height: '200px' }}>
                    <Lottie animationData={animationData2}/>
                  </div>
                </div>
                )}
              {message.includes('does not exist') && (
                <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '200px', height: '200px' }}>
                    <Lottie animationData={animationData3}  loop={2}/>
                  </div>
                </div>
               )}
            </div>
          )}
        </div>
      </div>
      <div className='flex' style={{ fontFamily: 'var(--font-family)' }}>
      {profileData && (
        <div className="bg-black rounded-md shadow-lg p-4 mt-4 max-w-lg mx-auto w-1/2" >
          <h2 className="text-lg font-semibold mb-2 text-center text-white">Profile Data</h2>
          <div className="text-center">
            {imageURL && (
              <img src={imageURL} alt="Profile" className="rounded-full h-32 w-32 mx-auto mb-4" />
            )}
          </div>
          <ul className="ml-4 text-white text-center justify-center">

            {Object.entries(profileData[0]).map(([key, value], index) => (
              index !== 7 && index !== 8 && (
                <li key={key} className="mb-2">
                  <strong>{key.replace(/#+/g, '')}: </strong>
                  {typeof value === 'object' ? JSON.stringify(value) : value === 0 ? 'No' : value === 1 ? 'Yes' : value}
                </li>
              )
            ))}
          </ul>
        </div>
       )}
       {feature_importance && (
          <div className="bg-black rounded-md shadow-lg p-4 mt-4 max-w-lg mx-auto w-1/2" style={{ fontFamily: 'var(--font-family)' }}>
            <h2 className="text-lg font-semibold mb-2 text-center">Feature Importance Chart</h2>
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
       )}
   
      </div>    
    </div>
  );
}

export default Index;
