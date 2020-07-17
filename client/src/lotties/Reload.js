import React from 'react';
import Lottie from 'react-lottie';
import reload from './reload.json';
// import reload from './facebook.json';

export default ({ isPaused, isStopped }) => {
  const proceedingOptions = {
    loop: false,
    autoplay: true,
    animationData: reload,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Lottie
      options={proceedingOptions}
      width={30}
      isStopped={isStopped}
      isClickToPauseDisabled={false}
      isPaused={isPaused}
    />
  );
};
