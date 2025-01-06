import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export default function TextAnimation() {
  const texts = [
    "Loading the past post history",
    "downloading posts",
    "generating descriptions",
    "predicting latest post likes"
  ]; // Array of texts to display

  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current index of text to display

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Move to the next text in a loop
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [texts]); // Re-run effect when texts array changes

  return (
    <Wrapper>
      {texts.map((text, index) => (
        <Span key={index} style={{ display: index === currentIndex ? 'inline-block' : 'none' }}>
          {text.split(" ").map((word, index) => (
            <Word key={index}>{word}&nbsp;</Word>
          ))}
        </Span>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  display: inline-block;
`;

const bounce = keyframes`
  0%, 100% { opacity: 0; transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg); filter: blur(10px); }
  50% { opacity: 1; transform: translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg); filter: blur(0px); }
`;

const Span = styled.span`
  opacity: 0;
  display: inline-block;
  animation: ${bounce} 6s infinite;

  &:nth-child(odd) {
    animation-delay: 0.1s;
  }
  &:nth-child(even) {
    animation-delay: 0.3s;
  }
`;

const Word = styled.span`
  display: inline-block;
`;
