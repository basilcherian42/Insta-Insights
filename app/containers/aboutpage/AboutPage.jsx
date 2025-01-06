// 'use client';
// import React from 'react';
// import AboutPageComp from '../../components/aboutpagecomp/AboutPageComp';
// import './aboutpage.css';
// import {motion} from 'framer-motion';
// import { fadeIn } from '../../variants'; 
// import Link from 'next/link';

// const AboutPage = () => (
//   <div className="gpt3__whatgpt3 section__margin" id="aboutusdiv">
//     <div className="gpt3__whatgpt3-feature">
//       <AboutPageComp title="What is Insta Insight ?" text="Insta Sight, a user-friendly platform, leverages machine learning and data analytics to detect fake Instagram accounts, fostering genuine connections and user trust, while also providing users with profile analysis which provide users with valuable insights for optimizing their online presence and engaging effectively with their audience."/>
//     </div>
//     <div className="gpt3__whatgpt3-heading">
//       <motion.h1  variants={fadeIn ("down", 0.1)}
//       initial ="hidden"
//       whileInView={"show"}
//       viewport={{once: false, amount: 0.1}} className="gradient__text">The possibilities are beyond your imagination</motion.h1>
//        <p><Link href="./Services" className="transition duration-300 ease-in-out hover:text-white">Explore the Services</Link></p>
//     </div>
//     <div className="gpt3__whatgpt3-container">
//     <AboutPageComp title="Fake Account Detection" text="To protect users from potential scams and deception." />
//     <AboutPageComp title="Profile Analysis & Visualization" text="Gain insights into audience and content performance." />
//     <AboutPageComp title="Likes Prediction" text="Empowering users with precise likes prediction, enhance your social presence.." />

//     </div>
//   </div>
// );

// export default AboutPage;

'use client'
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

function ServiceType() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });

      const animation = gsap.to(".photo:not(:first-child)", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 1,
      });

      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".rightblock",
        animation: animation,
        scrub: true,
        markers: false,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <React.Fragment>
      <Box className="gallery" sx={{ display: "flex" }} id="aboutusdiv">
        <Box
          className="left"
          sx={{
            width: "50%",
            marginLeft: "auto",
            "& .details": {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "40vw",
              marginLeft: "auto",
              fontSize: "3rem",
              fontFamily: 'var(--font-family)',
            },
          }}
        >
              <Box className="details">
                <h2 className="text-4xl bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 text-transparent bg-clip-text font-bold">BOT DETECTION</h2>
                <p className="text-xl text-gray-300 mt-4 font-semibold">
                Discover and prevent the infiltration of bots, safeguarding your platform&apos;s integrity and ensuring genuine interactions
                </p>
                <Link href="./Services" className="text-lg bg-gradient-to-r from-yellow-500 via-pink-500 to-orange-500 text-transparent bg-clip-text block mt-4 relative overflow-hidden hover:from-green-500 hover:via-green-400 hover:to-green-300 hover:text-lg hover:scale-105 duration-300 transform transition-all ">
                    Explore Services
                  </Link>  
              </Box>
              <Box className="details">
                <h2 className="text-4xl bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 text-transparent bg-clip-text font-bold">PROFILE ANALYSIS</h2>
                <p className="text-xl text-gray-300 mt-4 font-semibold"> Gain deep insights into user profiles, unlocking valuable data to drive informed decisions and enhance user experience</p>
                <Link href="./Services" className="text-lg bg-gradient-to-r from-yellow-500 via-pink-500 to-orange-500 text-transparent bg-clip-text block mt-4 relative overflow-hidden hover:from-green-500 hover:via-green-400 hover:to-green-300 hover:text-lg hover:scale-105 duration-300 transform transition-all ">
                    Explore Services
                  </Link> 
              </Box>
              <Box className="details">
                <h2 className="text-4xl bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 text-transparent bg-clip-text font-bold">LIKES PREDICTION</h2>
                <p className="text-xl text-gray-300 mt-4 font-semibold"> Anticipate user preferences and behavior, predicting likes to tailor content and experiences for maximum engagement and satisfaction</p>
                <Link href="./Services" className="text-lg bg-gradient-to-r from-yellow-500 via-pink-500 to-orange-500 text-transparent bg-clip-text block mt-4 relative overflow-hidden hover:from-green-500 hover:via-green-400 hover:to-green-300 hover:text-lg hover:scale-105 duration-300 transform transition-all ">
                    Explore Services
                  </Link> 
              </Box>
      </Box>
        <Box
          className="rightblock"
          sx={{
            width: "50%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "40vw",
              height: "40vw",
              position: "relative",
              "& .photo": {
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                "& img": {
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                },
              },
            }}
          >
            <Box className="photo">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ffc6ea1-2e8e-443f-b706-2439170eb5b1/dh7d1wh-159eab69-8c43-4808-8606-2758299fd9b4.png/v1/fill/w_894,h_894,q_70,strp/bot_image_by_vinay108_dh7d1wh-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzFmZmM2ZWExLTJlOGUtNDQzZi1iNzA2LTI0MzkxNzBlYjViMVwvZGg3ZDF3aC0xNTllYWI2OS04YzQzLTQ4MDgtODYwNi0yNzU4Mjk5ZmQ5YjQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.YRJCAn5H-DT803i-AN4g-9N7gBYLSp27dHzAjko1fzU"
                alt="img-1"
              />
            </Box>
            <Box className="photo">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ffc6ea1-2e8e-443f-b706-2439170eb5b1/dh7d2rf-9091cfca-b49a-4969-9075-0fd418e4c622.png/v1/fill/w_894,h_894,q_70,strp/profimage_by_vinay108_dh7d2rf-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzFmZmM2ZWExLTJlOGUtNDQzZi1iNzA2LTI0MzkxNzBlYjViMVwvZGg3ZDJyZi05MDkxY2ZjYS1iNDlhLTQ5NjktOTA3NS0wZmQ0MThlNGM2MjIucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.LY4wTuRVW1VM-gCFAYA73jXM0ET8xwLsPJXKHrsr78M"
                alt="img-2"
              />
            </Box>
            <Box className="photo">
              <img
                src="https://cdn.gencraft.com/prod/user/5c63aadb-88a6-4a7b-afa5-9644438a1207/03de45a9-f25b-4cf6-9830-81413e648594/image/image1_0.jpg?Expires=1720414156&Signature=fznHfV9QNi9ZFaMj8YlZFytG0tDRSS~jRLe7uZ7ttL4w5Y08mPCAubiZU0zwtoe2PJY6t1GHEiq2dVUkHbBUDJV8KLL5qWE4utQDUGJF7C9VmE6Ra54UOCCkgkYprJwfnDks6qHcqXX0xz02uc4y5uacYZ1mGU6KGKSjtYYMTM8jFVQ9cUSzVTM4de3Rc4WD9sfQ6stOi9oCY~5EOFa8HebsQL0gQqaT0IWPWnd0JoDlJmJmccOnE7v941ZmgvSnyUHtqknHlixbVal1ifHDCV2xzcq69tdA~ziAWqIb-BfXgX6WqVbuoMDlGwztVwsWTXo0NcmhrO~3mwdAamfueA__&Key-Pair-Id=K3RDDB1TZ8BHT8"
                alt="img-3"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default ServiceType;
