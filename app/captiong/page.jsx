'use client'
import React, { useState } from 'react';

async function fetchCaption(imageUrl) {
  const url = `https://image-caption-generator2.p.rapidapi.com/v2/captions?imageUrl=${encodeURIComponent(imageUrl)}&useEmojis=true&useHashtags=true&limit=3`;
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '460ae60dd7msh1b82d39bd36908dp12ae8djsnb92ee0179688',
          'X-RapidAPI-Host': 'image-caption-generator2.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.text();
      return result;
  } catch (error) {
      console.error(error);
      return null;
  }
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState(null);

  const handleSubmit = async () => {
      const result = await fetchCaption(imageUrl);
      setCaption(result);
  };

  return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-6">Image Caption Generator</h1>
          <div className="max-w-md w-full bg-white shadow-md rounded-md p-4">
              <input 
                  className="w-full text-indigo-600 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="Enter image URL" 
              />
              <button 
                  className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  onClick={handleSubmit}
              >
                  Submit
              </button>
              {caption && (
                  <div className="mt-6">
                      <h2 className="text-lg font-semibold mb-2">Caption:</h2>
                      <p className="text-black">{caption}</p>
                  </div>
              )}
          </div>
      </div>
  );
}

export default App;
