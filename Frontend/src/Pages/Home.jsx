import { SearchOutlined } from '@ant-design/icons';
import { Select } from '@mantine/core';
import { Button, Divider, Input } from 'antd';
import Search from 'antd/es/transfer/search';
import React from 'react';
import { useSelector } from 'react-redux';
import TourCard from '../myComponents/TourCard';
import Filter from '../myComponents/Filter';

const Home = () => {
  const tourData = useSelector((state) => state.tours.allTours);
  console.log(tourData);

  return (
    <div className="padding-layout">
      <div className="flex justify-center space-x-2">
        <Input placeholder="Search Tour...." className="w-2/6" />
        <Button icon={<SearchOutlined />} size="middle"></Button>
      </div>
      <Divider />
      <div className="flex justify-between">
        <h3 className="text-l font-bold font-palanquin uppercase text-green-500">
          All Tours
        </h3>
        <Filter />
      </div>
      <div className="  grid grid-cols-4 space-x-1 gap-y-10 pt-6 ">
        {tourData.map((tour, ind) => (
          <TourCard tour={tour} key={tour._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
