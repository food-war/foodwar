import React from 'react';
import Lottie from 'react-lottie';
import google from './google-border.json';

export default ({ isStopped }) => {
  const proceedingOptions = {
    loop: true,
    autoplay: true,
    animationData: google,
  };
  return <Lottie options={proceedingOptions} width={30} height={30} isStopped={isStopped} />;
};
