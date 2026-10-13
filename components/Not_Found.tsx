import React from 'react';
import {Lottie} from 'lottie-react';
import not_FoundAnimation from '../components/animations/Not_Found.json';

export default function Not_Found() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        src={not_FoundAnimation}
        autoplay={true} 
        loop={true}
        style={{ width: 300, height: 300 }}
      />
      <p className="text-xl font-semibold ">Not Found</p>
    </div>
  );
}
