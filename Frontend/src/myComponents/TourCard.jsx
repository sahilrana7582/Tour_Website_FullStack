import React from 'react';
import { Button, Card, Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
const { Meta } = Card;
const TourCard = ({ tour }) => {
  const curr = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    const currPath = curr.pathname;
    navigate(`${currPath}/${tour.id}`);
  };
  return (
    <Card
      hoverable
      className="w-[280px]"
      cover={
        <img
          alt="example"
          src={`/images/${tour.imageCover}`}
          className="h-[250px]"
        />
      }
      onClick={handleClick}
    >
      <Meta
        title={tour?.name}
        description={tour?.summary}
        className="min-h-[100px]"
      />
      <Divider />
      <div className=" flex flex-col gap-4">
        <div className="flex justify-between w-full ">
          <p className="font-semibold">{tour?.difficulty?.toUpperCase()} </p>
          <p>${tour?.price}</p>
        </div>
        <Button className="w-full">Book Now</Button>
      </div>
    </Card>
  );
};
export default TourCard;
