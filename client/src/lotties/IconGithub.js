import React from 'react';
import Lottie from 'react-lottie';
import gitlogo from './github-logo.json';

export default ({ isStopped }) => {
  const proceedingOptions = {
    loop: true,
    autoplay: true,
    animationData: gitlogo,
  };
  return <Lottie options={proceedingOptions} width={30} height={30} isStopped={isStopped} />;
};
