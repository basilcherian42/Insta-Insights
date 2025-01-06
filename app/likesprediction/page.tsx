'use client'
import React, { useState } from 'react';
import styles from './likesprediction.module.css'; 
import CustomLoader from '../CustomLoader/CustomLoader';
import Lottie from 'lottie-react';
import animationjson from '../erroranimation.json';
import { error } from 'console';

const IndexPage: React.FC = () => {
  const [message, setMessage] = useState('Enter username and click submit');
  const [username, setUsername] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [datetimeUtc, setDatetimeUtc] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [predictedLikes, setPredictedLikes] = useState<string>('');
  const [predictedLikes2, setPredictedLikes2] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [accountFormSubmitted, setAccountFormSubmitted] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState(false);

  const closeAlert = () => {
    setShowLoader(false); // Close the alert message
  };

  const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatetimeUtc(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUsername = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPredictedLikes2(''); // Reset the value of predictedLikes2
    setPredictedLikes(''); // Reset the value of predictedLikes
    setAccountFormSubmitted(false);
    setFormSubmitted(false);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/get_likes/${encodeURIComponent(username)}`);
      setMessage('Data fetched successfully');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPredictedLikes(data.message);
      setMessage('Data fetched successfully');
    } catch (error) {
      console.error('Error fetching predicted likes:', error); 
      setMessage('Error fetching data'); 
    } finally {
      setLoading(false); 
      setAccountFormSubmitted(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading2(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ caption, datetime_utc: datetimeUtc }));

      if (image) {
        formData.append('image', image);
      }

      const response2 = await fetch('http://localhost:8080/new_likes', {
        method: 'POST',
        body: formData,
      });

      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const data = await response2.json();
      setPredictedLikes2(data.message);
    } catch (error) {
      console.error('Error fetching predicted likes:', error);
    } finally {
      setLoading2(false);
      setFormSubmitted(true);
    }
  };

  return (
    <div className={styles.gradient__bg}>
    <div className="flex flex-col items-center min-h-screen p-20" >
            <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-lg font-medium leading-tight text-transparent sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight mb-4 p-4">
              Predicted Likes for Instagram Post
            </h1>

          <div className="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-lg bg-gradient-to-br from-gray-500  text-center text-white">
            <form onSubmit={handleSubmitUsername}>
              <label className="block text-sm font-semi-bold mb-2"style={{ fontFamily: 'var(--font-family)' }}>
                Enter Instagram Username :  
                <input type="text" value={username} onChange={handleUsernameInputChange} className=" mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </label>
              <button
                    type="submit"
                    disabled={loading}
                    className="bg-violet-500 text-white px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-black hover:text-white"              >
                    Submit
                    {loading && (
                        <div style={{ position: 'absolute', zIndex: 2 }}>
                          <CustomLoader />
                        </div>
                      )}
              </button> 
            </form>
        </div>
        <div className="text-xl font-semibold text-red-300">
              {message}
            </div>
     
            {accountFormSubmitted && !predictedLikes &&  (
                      <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '200px', height: '200px' }}>
                        <Lottie animationData={animationjson}/>
                      </div>
                    </div>
                  )}

             {accountFormSubmitted && predictedLikes &&  (
                <div className="mt-0">
                  <p className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-lg font-semibold leading-tight text-transparent sm:text-xl sm:leading-tight md:text-2xl md:leading-tight mb-4 p-4">Predicted Likes for latest post:</p>
                  <p className="text-2xl mb-10 text-blue-400 font-bold text-center">{predictedLikes}</p>
                </div>
              )}



              {accountFormSubmitted && predictedLikes && (
                <div className="m-5 p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-500 text-center text-white">
                  <form onSubmit={handleSubmit}>
                    <label className="text-white block mb-4">
                      Enter Caption:
                      <input type="text" value={caption} onChange={handleCaptionChange} className="px-4 py-2 rounded border-white bg-transparent border" />
                    </label>
                    <label className="text-white block mb-4">
                      Enter Datetime (UTC):
                      <input type="datetime-local" value={datetimeUtc} onChange={handleDatetimeChange} className="px-4 py-2 rounded border-white bg-transparent border" />
                    </label>
                    <label className="text-white block mb-4">
                      Upload Image:
                      <input type="file" accept="image/*" onChange={handleImageChange} className="m-4" />
                    </label>
                    <button
                    type="submit"
                    disabled={loading}
                    className="block w-full px-4 py-2 rounded bg-purple-500 cursor-pointer shadow-md hover:bg-black hover:text-white"
                      >
                    Submit
                    {loading2 &&  (
                        <div style={{ position: 'absolute', zIndex: 2 }}>
                          <CustomLoader />
                        </div>
                      )}
                     </button>
                  </form>
                </div>
              )}
                 {formSubmitted && predictedLikes2 &&  (
                <div className="mt-0">
                  <p className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-lg font-semibold leading-tight text-transparent sm:text-xl sm:leading-tight md:text-2xl md:leading-tight mb-4 p-4">Predicted Likes the new post: </p>
                  <p className="text-2xl mb-10 text-blue-400 font-bold text-center">{predictedLikes2}</p>
                </div>
              )}



    </div>
  </div>
  );
};

export default IndexPage;
