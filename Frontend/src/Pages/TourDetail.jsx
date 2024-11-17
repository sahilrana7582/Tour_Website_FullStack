import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL, jwtTojen } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { setOneTour } from '../store/slices/tour';
import { useEditor } from '@tiptap/react';
import { Button, Card, Divider, Image } from 'antd';
import { CircularProgress } from '@mui/material';
import CustomImageList from '../myComponents/ImageList';
import QuiltedImageList from '../myComponents/ImageList';
import { MyMap } from '../myComponents/Map';
import FactGuides from '../myComponents/FactGuides';
import Carousal from '../myComponents/Carousal';
import { ClockCircleOutlined, ZoomOutOutlined } from '@ant-design/icons';
import PicCard from '../myComponents/PicCard';
import toast, { Toaster } from 'react-hot-toast';

const TourDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let data = useSelector((state) => state.tours.singleTour);
  console.log(data);

  const fetchData = async () => {
    const api = await fetch(
      `${import.meta.env.VITE_BASE_URL}/tours/${params.id}`,
      {
        headers: {
          Authorization: jwtTojen,
        },
      }
    );

    const res = await api.json();
    dispatch(setOneTour(res?.data?.data));
  };

  const handleBookClick = () => {
    const user = localStorage.getItem('name');

    if (user) {
      toast('Do Payment');
    } else {
      toast("You're Not Logged In! Login First");
    }
  };

  useEffect(() => {
    if (Object.entries(data).length === 0) {
      // setTimeout(() => {
      fetchData();
      // });
    }
    return () => {
      dispatch(setOneTour([]));
    };
  }, [dispatch]);

  if (Object.entries(data).length === 0) {
    return (
      <div className="flex justify-center p-20">
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div className="">
      <div className="h-[500px] w-full relative">
        <div className="h-full w-full bg-green-600 absolute opacity-35"></div>
        <img
          src={`/images/${data.imageCover}`}
          className="w-full h-full object-cover"
          alt="Tour Image"
        />
        <div className="flex flex-col items-center justify-center absolute gap-5 top-1/2 w-full text-white">
          <h1 className="font-palanquin text-6xl  font-bold ">
            {data?.name?.toUpperCase()}
          </h1>
          <div className="flex gap-10">
            <p className="text-l font-semibold text flex gap-4">
              <ClockCircleOutlined />
              <span>{data?.duration} Days</span>
            </p>
            <p className="text-l font-semibold text flex gap-4">
              <ZoomOutOutlined />
              <span>{data?.startLocation?.address} Days</span>
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="relative ">
        <div className="relative flex flex-col bg-slate-50 shadow-lg lg:flex-row justify-evenly items-center gap-8 lg:gap-0 px-6 lg:px-12 py-12">
          <div className="w-full lg:w-2/5">
            <FactGuides data={data} />
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-6 items-start p-4 ">
            <h1 className="text-lg font-montserrat font-bold text-green-400 uppercase">
              About {data?.name} Tour
            </h1>
            <p className="font-montserrat font-medium text-base text-gray-700">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
      {/* MY MAP*/}
      <div className="flex  w-full -row-start-6  ">
        {data?.images?.map((img, ind) => (
          <PicCard img={img} key={img} />
        ))}
      </div>
      <MyMap markers={data?.locations} />
      <Divider />
      <div className="flex justify-center my-10">
        <Card bordered={true} className="shadow-md w-1/2  ">
          <div className="flex justify-between items-baseline p-10">
            <h1 className="text-balance font-semibold uppercase text-green-400">
              What are your waiting for?
            </h1>
            <Button
              className="text-l font-semibold font-montserrat uppercase"
              size="large"
              onClick={handleBookClick}
            >
              Book Now
            </Button>
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default TourDetail;
