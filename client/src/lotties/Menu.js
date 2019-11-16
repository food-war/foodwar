import React from 'react';
import Lottie from 'react-lottie';
import menu from './mobile_header_menu.json';

export default ({ isStopped }) => {
  const proceedingOptions = {
    loop: false,
    autoplay: false,
    animationData: menu,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={proceedingOptions} width={30} height={30} isStopped={isStopped} />;
};
