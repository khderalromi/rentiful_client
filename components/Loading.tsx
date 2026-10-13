import React from 'react';
import {Lottie} from 'lottie-react';
import loadingAnimation from '../components/animations/Home.json';

export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        src={loadingAnimation}
        autoplay={true} 
        loop={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}
