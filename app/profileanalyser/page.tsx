'use client'
import React, { useState, useEffect,useRef } from 'react';
import styles from './profileanalyser.module.css'; 
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, StepLineSeries, Tooltip, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import Chart from 'chart.js/auto';
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x3RXxbf1x0ZFdMZVVbRnNPMyBoS35RckVnWH9ecnFcRGZZUUNw');

declare global {
  interface Window {
    myChart?: Chart;
  }
}
interface Hashtag {
  hashtag: string;
  count: number;
}

function Index() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('Enter username and click submit');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null); 
  const [followers, setFollowers] = useState<{ x: Date, y: number }[]>([]);  
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [showAnalyseButton, setShowAnalyseButton] = useState(false); // New state
  const [fetchingFollowers, setFetchingFollowers] = useState(true); // Flag to control fetching
  const [showForm, setShowForm] = useState(true); // New state
  const [fetchlikes, setfetchlikes] = useState<any | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null); 
  const [fetchEngagement, setfetchEngagement] = useState<any | null>(null);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [followersChartVisible, setFollowersChartVisible] = useState(false); // New state
  const [likesChartVisible, setLikesChartVisible] = useState(false); // State for likes chart visibility
  const [engagementDataVisible, setEngagementDataVisible] = useState(false); // State for engagement data visibility
  const [hashtagsVisible, setHashtagsVisible] = useState(false); // State for hashtags visibility
  const [followersChartButtonVisible, setFollowersChartButtonVisible] = useState(false);
  const [likesChartButtonVisible, setLikesChartButtonVisible] = useState(false);
  const [engagementDataButtonVisible, setEngagementDataButtonVisible] = useState(false);
  const [hashtagsButtonVisible, setHashtagsButtonVisible] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [likesDataFetched, setLikesDataFetched] = useState(false); // Track whether likes data has been fetched
  const [engagementDataFetched, setEngagementDataFetched] = useState(false); // Track whether likes data has been fetched
  const [hashtagDataFetched, setHashtagDataFetched] = useState(false); // Track whether likes data has been fetched

  const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowForm(false);
    setFollowersChartButtonVisible(true);
    setLikesChartButtonVisible(true);
    setEngagementDataButtonVisible(true);
    setHashtagsButtonVisible(true);
    try {
      const response = await fetch(`http://localhost:8080/get_profile/${encodeURIComponent(username)}`);
      const data = await response.json();
      setProfileData(data.data);
      setImageURL(`http://localhost:8080/get_image/${encodeURIComponent(username)}`); // Set image URL
      setMessage('Data fetched successfully');
      setShowAnalyseButton(true);
      // fetchProfileLikes();
      // fetchProfileHashtags();
      // await fetchEngagementdata(); //makes this function wait until fetchProfileLikes(); is run 
    } catch (error) {
      setMessage('Error fetching data');
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        if (profileData && fetchEngagement && fetchlikes && hashtagsVisible) {
        const intervalId = setInterval(fetchProfileFollowers, 30000); // Fetch data every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
      }
  }, [profileData,fetchEngagement, fetchlikes, hashtags]); //here the fetchProfileFollowers() function is made to wait until all the other function runs and data is fetched



  const fetchProfileFollowers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/profile_followers`);
      const data = await response.json();
      const followersCount = parseInt(data.message); // Convert string to number
      setFollowers(prevFollowers => [...(prevFollowers || []), { x: new Date(), y: followersCount }]);
      setMessage('Profile followers fetched successfully');
    } catch (error) {
      setMessage('Error fetching profile followers');
    } finally {
    }
  };

  const fetchProfileLikes = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8080/profile_likes`);
        const data = await response.json();
        setfetchlikes(data);
    } catch (error) {
        console.error('Error fetching profile likes:', error);
    }
    setLoading(false);
};

  const fetchEngagementdata = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8080/profile_engagement2`);
        const data = await response.json();
        setfetchEngagement(data);
    } catch (error) {
        console.error('Error fetching profile likes:', error);
    }
    setLoading(false);
};


  const fetchProfileHashtags = async () => {
    setLoading(true);
      try {
          const response = await fetch('http://localhost:8080/profile_hashtags');
          const data = await response.json();
          setHashtags(data);
      } catch (error) {
          console.error('Error fetching profile hashtags:', error);
      }
      setLoading(false);
  };





  const onChartLoad = (args: ILoadedEventArgs): void => {
    const chart: Element | null = document.getElementById('charts');
    if (chart) chart.setAttribute('title', '');
  };

  const load = (args: ILoadedEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
  };


  const handleAnalyseAnotherProfile = () => {
    setHashtagDataFetched(false);
    setLikesDataFetched(false);
    setEngagementDataFetched(false);
    setLoading(false);
    setLoading2(false);
    setLoading3(false);
    setLoading4(false);
    setShowForm(true);
    setProfileData(null); // Reset profile data
    setImageURL(null); // Reset image URL
    setFollowers([]); // Reset followers data
    setUsername(''); // Clear username field
    setfetchlikes(null);
    setfetchEngagement(null);
    setHashtags([]); // Clear hashtag data
    setFetchingFollowers(false);
    setFollowersChartVisible(false); // Hide followers chart
    setLikesChartVisible(false); // Hide likes chart
    setEngagementDataVisible(false); // Hide engagement data
    setHashtagsVisible(false); // Hide hashtags
    setFollowersChartButtonVisible(false);
    setLikesChartButtonVisible(false);
    setEngagementDataButtonVisible(false);
    setHashtagsButtonVisible(false);
       // Clear the interval only if it's defined
       if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    setShowAnalyseButton(false); // Hide the 'Analyse Another Profile' button
  
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    
    if (!ctx || !fetchlikes || !likesChartVisible) return; // Check if fetchlikes is available and likesChartVisible is true
  
    // Destroy the existing chart if it exists
    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
  
    // Create a new chart
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Last Month', 'Last Six Months', 'All Time'],
        datasets: [{
          label: ' ',
          data: [
            fetchlikes.last_month.average_likes_per_post,
            fetchlikes.last_six_months.average_likes_per_post,
            fetchlikes.all_time.average_likes_per_post
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Average Likes'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Timeline'
            },
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}`
            }
          }
        }
      }
    });
  
    // Store the chart instance in the window object
    window.myChart = chart;
  
    // Cleanup function to destroy the chart when the component unmounts or when fetchlikes changes
    return () => {
      if (window.myChart instanceof Chart) {
        window.myChart.destroy();
      }
    };
  }, [fetchlikes, likesChartVisible]);
  
  

  const toggleFollowersChartVisibility = () => {
    setFollowersChartVisible(!followersChartVisible);
  };

  const toggleLikesChartVisibility = async () => {
    setLoading2(true); // Set loading to true when the button is clicked
    
    try {
      // Fetch profile likes data only if the likes chart is going to be shown and data hasn't been fetched yet
      if (!likesChartVisible && !likesDataFetched) {
        await fetchProfileLikes();
        setLikesDataFetched(true); // Mark likes data as fetched
      }
  
      // Toggle the visibility of the likes chart
      setLikesChartVisible(!likesChartVisible);
    } catch (error) {
      console.error('Error fetching profile likes:', error);
    } finally {
      setLoading2(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  
  

  const toggleEngagementDataVisibility = async () => {
    setLoading3(true); // Set loading to true when the button is clicked
    
    try {
      // Fetch engagement data only if it's going to be shown
      if (!engagementDataVisible && !engagementDataFetched) {
        await fetchEngagementdata();
        setEngagementDataFetched(true);
      }
      
      // Toggle the visibility of engagement data
      setEngagementDataVisible(!engagementDataVisible);
    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading3(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  

  const toggleHashtagsVisibility = async () => {
    setLoading4(true); // Set loading to true when the button is clicked
    
    try {
      // Fetch hashtags data only if it's going to be shown
      if (!hashtagsVisible  && !hashtagDataFetched) {
        await fetchProfileHashtags();
        setHashtagDataFetched(true);
      }
      
      // Toggle the visibility of hashtags
      setHashtagsVisible(!hashtagsVisible);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
    } finally {
      setLoading4(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
 
  return (
    <div className={styles.gradient__bg}>
      <div className="max-w-lg mx-auto p-6">
        <div className={styles.heading}>
          <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-lg font-medium leading-tight text-transparent sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight mb-4 p-4">
            Profile Analyser
          </h1>
        </div>
        {showForm && (
          <div className="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-lg bg-gradient-to-br from-gray-500  text-center text-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semi-bold mb-2" style={{ fontFamily: 'var(--font-family)' }} htmlFor="username">
                  Enter Instagram Username:
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-violet-500 text-white px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-black hover:text-white"
                  type="submit"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {showAnalyseButton && (
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              onClick={handleAnalyseAnotherProfile}
            >
              Analyse Another Profile
            </button>
          </div>
        )}

        <div className="text-center mt-4">
        {loading && !loading2 && !loading3 && !loading4 ? (
             <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-gray-700">
              <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.518a4.001 4.001 0 00-3.465 6.022L6 17.292zM20 12c0-4.418-3.582-8-8-8v4c2.168 0 4.16.87 5.657 2.343l1.414-1.414A9.969 9.969 0 0012 6.001v3.471l-1.757-1.757A7.969 7.969 0 014 12h16z"></path>
              </svg>
              Loading...
            </div>
          ) : (
            <div className="text-3xl font-semibold text-red-300">
              {/* {message} */}
            </div>
          )}
        </div>
      </div>

      {profileData && (
        <div className="bg-black rounded-md shadow-lg p-4 mt-4 max-w-lg mx-auto w-1/2">
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
                  <strong>{key.toUpperCase().replace(/#+/g, '')}: </strong>
                  {typeof value === 'object' ? JSON.stringify(value) : value === 0 ? 'No' : value === 1 ? 'Yes' : value}
                </li>
              )
            ))}
          </ul>
        </div>
      )}

            {loading2 ? (
              <div className="flex items-center justify-center h-screen">
                <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-gray-700">
                  <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.518a4.001 4.001 0 00-3.465 6.022L6 17.292zM20 12c0-4.418-3.582-8-8-8v4c2.168 0 4.16.87 5.657 2.343l1.414-1.414A9.969 9.969 0 0012 6.001v3.471l-1.757-1.757A7.969 7.969 0 014 12h16z"></path>
                  </svg>
                  Loading...
                </div>
              </div>
            ) : (
              likesChartButtonVisible && (
                <div className="text-center mt-4">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                    style={{ width: '30%' }}
                    onClick={toggleLikesChartVisibility}
                  >
                    {likesChartVisible ? 'Hide Likes Chart' : 'Show Likes Chart'}
                  </button>
                </div>
              )
            )}


              {likesChartVisible && (
                <div className="bg-black rounded-md shadow-lg p-4 mt-4 max-w-full mx-auto text-center grid grid-cols-3 gap-4">
                  {/* Last Month */}
                  <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-2 text-center text-white">Last Month</h2>
                    <div className="text-white">
                      <p>Total Posts: {fetchlikes?.last_month?.total_posts}</p>
                      <p>Total Likes: {fetchlikes?.last_month?.total_likes}</p>
                      <p>Average Likes per Post: {fetchlikes?.last_month?.average_likes_per_post}</p>
                    </div>
                  </div>
                  {/* Last Six Months */}
                  <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-2 text-center text-white">Last Six Months</h2>
                    <div className="text-white">
                      <p>Total Posts: {fetchlikes?.last_six_months?.total_posts}</p>
                      <p>Total Likes: {fetchlikes?.last_six_months?.total_likes}</p>
                      <p>Average Likes per Post: {fetchlikes?.last_six_months?.average_likes_per_post}</p>
                    </div>
                  </div>
                  {/* All Time */}
                  <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-2 text-center text-white">All Time</h2>
                    <div className="text-white">
                      <p>Total Posts: {fetchlikes?.all_time?.total_posts}</p>
                      <p>Total Likes: {fetchlikes?.all_time?.total_likes}</p>
                      <p>Average Likes per Post: {fetchlikes?.all_time?.average_likes_per_post}</p>
                    </div>
                  </div>
                  {/* Chart */}
                  <canvas ref={chartRef} className="col-span-3"></canvas>
                </div>
              )}

          

                
                  {loading3 ? (
                      <div className="flex items-center justify-center h-screen">
                      <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-gray-700">
                        <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.518a4.001 4.001 0 00-3.465 6.022L6 17.292zM20 12c0-4.418-3.582-8-8-8v4c2.168 0 4.16.87 5.657 2.343l1.414-1.414A9.969 9.969 0 0012 6.001v3.471l-1.757-1.757A7.969 7.969 0 014 12h16z"></path>
                        </svg>
                        Loading...
                      </div>
                      </div>
                      ) : (
                      engagementDataButtonVisible && (
                        <div className="text-center mt-4">
                          <button
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                            style={{ width: '30%' }}
                            onClick={toggleEngagementDataVisibility}
                          >
                            {engagementDataVisible ? 'Hide Engagement Data Chart' : 'Show Engagement Data'}
                          </button>
                        </div>
                      )
                    )}
                  <div className="flex justify-center items-center h-full">
                    {engagementDataVisible && (
                          <div className="bg-black rounded-md shadow-lg p-4 mt-4 max-w-full mx-auto text-center">
                            <h2 className="text-lg font-semibold mb-2 text-center text-white">Engagement Data</h2>
                            <div className="text-white">
                              <p className={fetchEngagement?.result === "increasing" ? "text-green-500" : fetchEngagement?.result === "decreasing" ? "text-red-500" : ""}>
                                {fetchEngagement?.result === "increasing" ? (
                                  "Your Instagram profile is growing"
                                ) : fetchEngagement?.result === "decreasing" ? (
                                  "Your Instagram profile is in decline"
                                ) : (
                                  "Engagement data not available"
                                )}
                              </p>
                              <p>
                                Percentage Change in Growth:{" "}
                                <span className={fetchEngagement?.result === "increasing" ? "text-green-500" : fetchEngagement?.result === "decreasing" ? "text-red-500" : ""}>
                                  {fetchEngagement?.percent_change ? parseFloat(fetchEngagement?.percent_change).toFixed(2) : "N/A"}%
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                  </div>


      {loading4 ? (
          <div className="flex items-center justify-center h-screen">
                  <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-gray-700">
                    <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.518a4.001 4.001 0 00-3.465 6.022L6 17.292zM20 12c0-4.418-3.582-8-8-8v4c2.168 0 4.16.87 5.657 2.343l1.414-1.414A9.969 9.969 0 0012 6.001v3.471l-1.757-1.757A7.969 7.969 0 014 12h16z"></path>
                    </svg>
                    Loading...
                  </div>
                  </div>
                ) : (
                  <div>
                    {/* Hashtags Data Button */}
                    {hashtagsButtonVisible && (
                        <div className="text-center mt-4 flex justify-center">
                          <button
                            className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline`}
                            style={{ width: '30%' }}
                            onClick={toggleHashtagsVisibility}
                          >
                            {hashtagsVisible ? 'Hide Hashtags Data' : 'Show Hashtags Data'}
                          </button>
                        </div>
                      )}

                  </div>
                )}
                      <div className="flex justify-center items-center h-full">
                          {hashtagsVisible && (
                            <div className={`bg-black rounded-md shadow-lg p-4 mt-4 max-w-full mx-auto text-center ${hashtagsVisible ? styles.slide_down : styles.slide_up}`}>
                              <h2 className="text-lg font-semibold mb-2 text-center text-white">Top 5 Hashtags:</h2>
                              <ul className="list-none p-0">
                                {hashtags.map((hashtag, index) => (
                                  <li key={index} className="flex items-center justify-start">
                                    <span className="mr-2">{index + 1}.</span>
                                    <span>{hashtag.hashtag}, Count: {hashtag.count}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>



            {followersChartButtonVisible &&(
                   <div className="text-center mt-4">
                      <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        style={{ width: '30%' }}
                        onClick={toggleFollowersChartVisibility}
                      >
                        {followersChartVisible ? 'Hide Followers Chart' : 'Show Followers Chart'}
                      </button>
                    </div>
                  )}  
                    
            {followersChartVisible && (
              <div className='control-pane' style={{ width: '97%', margin: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', padding: '20px' }}>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section' style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
                  <ChartComponent 
                    id='charts' 
                    style={{ textAlign: "center", width: '100%' }} 
                    primaryXAxis={{ 
                      title: 'Timeline', 
                      valueType: 'DateTime', 
                      edgeLabelPlacement: 'Shift', 
                      majorGridLines: { width: 0 },
                      labelIntersectAction: 'Rotate45', // Rotate x-axis labels for better readability
                      labelStyle: { fontFamily: 'var(--font-family)', fontWeight: 'bold' } // Customize x-axis label font and color
                    }} 
                    load={load} 
                    primaryYAxis={{ 
                      title: 'Followers Count', 
                      interval: 10, 
                      lineStyle: { width: 0 }, 
                      majorTickLines: { width: 0 },
                      labelStyle: { fontFamily: 'var(--font-family)', fontWeight: 'bold' } // Customize y-axis label font and color
                    }} 
                    width={'95%'} // Set chart width to 100%
                    chartArea={{ 
                      border: { width: 0 },
                    }} 
                    legendSettings={{ visible: false, enableHighlight: true }} 
                    tooltip={{ 
                      enable: true, 
                      shared: true, 
                      header: "<b>Follower Count</b>", 
                      format: "${point.x} : <b>${point.y}</b>" 
                    }} 
                    loaded={onChartLoad} 
                    title='Profile Followers'>
                    <Inject services={[StepLineSeries, Tooltip, DateTime, Highlight]} />
                    <SeriesCollectionDirective>
                      <SeriesDirective 
                        dataSource={followers} 
                        xName='x' 
                        yName='y' 
                        name='Followers' 
                        width={5} 
                        type='StepLine' 
                        marker={{ isFilled: false, visible: true, width: 7, height: 7 }} 
                      />
                    </SeriesCollectionDirective>
                  </ChartComponent>
                </div>
              </div>
            )}
    </div>
  );


  }

export default Index;
