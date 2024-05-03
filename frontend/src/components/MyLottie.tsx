import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../Animation - 1714717190863.json";

interface MyLottieControlComponentProps {
  loading: boolean;
}

const MyLottieControlComponent: React.FC<MyLottieControlComponentProps> = ({
  loading,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(!loading);

  const defaultOptions = {
    loop: true,
    autoplay: false, // 根据需要设置是否自动播放
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    // 根据loading状态控制动画播放或暂停
    setIsPaused(!loading);
  }, [loading]);

  return (
    <Lottie
      options={defaultOptions}
      height={100}
      width={100}
      isStopped={!loading && isPaused}
      isPaused={isPaused}
    />
  );
};

export default MyLottieControlComponent;
