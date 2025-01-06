import React from "react";
import "./styles.css";
import FlipCard from "./FlipCard";
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const border = "1px solid #000"; // Assigning a simple black border
const boxShadow = "0px 4px 24px #000"; // Assigning a simple black box shadow

const handleLinkClick = (event) => {
  event.stopPropagation(); // Prevent the click event from bubbling up to the parent flip card
};

const cars = [
  {
    click: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem",color:"#D3D3D3" }}>Click anywhere in the box to see the demo</p>,    
    link: <Link href='/fakedetection'>
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.button
        style={{
          border,
          boxShadow,
        }}
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="group relative flex items-center justify-center gap-1.5 bg-purple-500 rounded-full bg-gray-950/10 px-6 py-3 text-xl text-gray-50 transition-colors hover:bg-purple-950/100 sm:w-auto sm:max-w-[500px] md:w-[400px] h-[60px]"
        onClick={handleLinkClick}
      >        
        View
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button>
    </motion.div>
  </Link>,

    name: "Bot Detection",
    description: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem" }}>Unmasking Deception: Utilize advanced machine learning to detect and expose Instagram bots, safeguarding digital integrity and trust.</p>,
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJyank1ZmpuazFhcDB5cWdhOW5sdjd4enNmMXJ6ajY1MXkweTJjMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IRuHPKujFSesnpSNOa/giphy.gif"  },
  {
    click: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem",color:"#D3D3D3" }}>Click anywhere in the box to see the demo</p>,    
    link: <Link href='/profileanalyser'>
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.button
        style={{
          border,
          boxShadow,
        }}
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="group relative flex items-center justify-center gap-1.5 bg-purple-500 rounded-full bg-gray-950/10 px-6 py-3 text-xl text-gray-50 transition-colors hover:bg-purple-950/100 sm:w-auto sm:max-w-[500px] md:w-[400px] h-[60px]"
        onClick={handleLinkClick}
      >        
        View
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button>
    </motion.div>
  </Link>,
    name: "Profile Analyser",
    description: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem" }}>Insightful Visualizations: Gain a comprehensive overview of your profiles content.</p>,
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThzbDVzYzg3aHdjem5ocm01cXF1MHZ3MnFieWlzZGJxbXl1YnA4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CruYDDFKHBXrfNFO3t/giphy.gif"  },
  {
    click: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem",color:"#D3D3D3"}}>Click anywhere in the box to see the demo</p>,
    link: <Link href='/likesprediction'>
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.button
        style={{
          border,
          boxShadow,
        }}
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="group relative flex items-center justify-center gap-1.5 bg-purple-500 rounded-full bg-gray-950/10 px-6 py-3 text-xl text-gray-50 transition-colors hover:bg-purple-950/100 sm:w-auto sm:max-w-[500px] md:w-[400px] h-[60px]"
        onClick={handleLinkClick}
      >        
       View
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button>
    </motion.div>
  </Link>,
    name: " Likes Prediction",
    description: <p style={{ marginTop: "2rem", textAlign: "center", padding:"2rem" }}>Precise Anticipation: Anticipate the pulse of your audience with accurate likes prediction</p>,
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTRxZHNqYWV0b2xpM3V0YjJnMjB5ZGpzb3NxZmFsaWVrejgydmJmMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/og8JjdoFjrkH95iIIH/giphy.gif"  },
];

function MultipleFlipCards() {

  return (
    <div className="app">
      <div className="car-container">
        {cars.map((car, index) => (
          <FlipCard
            key={index}
            link ={car.link}
            name={car.name}
            description={car.description}
            gifUrl={car.gifUrl}
            click ={car.click}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;
