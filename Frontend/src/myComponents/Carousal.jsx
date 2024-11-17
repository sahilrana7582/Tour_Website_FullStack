import React from 'react';
import { Carousel, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { baseURL } from '../utils/constant';

const Carousal = () => {
  return (
    <Carousel
      autoplay
      autoplaySpeed={1500}
      className="h-screen"
      effect="fade"
      infinite
    >
      <div className="h-full">
        <img src="/images/tour-4-1.jpg" className="object-fill "></img>
      </div>
      <div className="h-full">
        <img src="/images/tour-5-1.jpg" className="object-fill "></img>
      </div>
      <div className="h-full">
        <img src="/images/tour-5-2.jpg" className="object-fill "></img>
      </div>
    </Carousel>
  );
};
export default Carousal;
