import React from 'react';
import Lottie from 'react-lottie';
import facebook from './facebook.json';

export default ({ isStopped }) => {
  const proceedingOptions = {
    loop: true,
    autoplay: true,
    animationData: facebook,
  };
  return <Lottie options={proceedingOptions} width={40} height={40} isStopped={isStopped} />;
};
