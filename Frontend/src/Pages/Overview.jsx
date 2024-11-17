import React, { useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import Carousal from '../myComponents/Carousal';
import { baseURL, jwtTojen } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTours } from '../store/slices/tour';
import { Button } from 'antd';
import { DownloadOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Overview = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tours.allTours);
  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tours`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_JWT_TOKEN}` },
    });

    const result = await res.json();
    const tourData = result?.data?.data;
    dispatch(getAllTours(tourData));
  };
  useEffect(() => {
    if (data?.length == 0) {
      fetchData();
    }
  }, [dispatch, data]);
  return (
    <div className="h-screen">
      <div className="bg-black absolute z-10 h-full w-full opacity-50"></div>
      <Carousal />
      <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-6xl font-palanquin font-bold text-white">
          IN-<span className="text-red-400">Tours</span>
        </h1>
        <Link to="/home">
          <Button
            type="default"
            ghost
            icon={<RightOutlined />}
            size="large"
            className="mt-6"
            iconPosition="end"
          >
            Explore More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Overview;
