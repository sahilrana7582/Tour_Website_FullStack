import {
  CalendarFilled,
  StarFilled,
  UsergroupAddOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';

const FactGuides = ({ data }) => {
  const dateObj = new Date(data?.startDates[0]);
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
        <h1 className="text-lg font-montserrat font-bold mb-8 text-green-400 uppercase">
          Quick Facts
        </h1>
        <div className="grid grid-cols-2 gap-6 items-baseline">
          <div className="flex gap-6 items-baseline">
            <CalendarFilled />
            <h3 className="font-semibold uppercase">Next Date</h3>
          </div>
          <p className="font-montserrat font-semibold text-base text-gray-700 uppercase">
            {`${dateObj.toLocaleString('default', {
              month: 'long',
            })} ${dateObj.getFullYear()}`}
          </p>
          <div className="flex gap-6 items-baseline">
            <VerticalAlignTopOutlined />
            <h3 className="font-semibold uppercase">Difficulty</h3>
          </div>
          <p className="font-montserrat font-semibold text-base text-gray-700 uppercase">
            {data?.difficulty}
          </p>
          <div className="flex gap-6 items-baseline">
            <UsergroupAddOutlined />
            <h3 className="font-semibold uppercase">participants</h3>
          </div>
          <p className="font-montserrat font-semibold text-base text-gray-700 uppercase">
            {data?.maxGroupSize}
          </p>
          <div className="flex gap-6 items-baseline">
            <StarFilled />
            <h3 className="font-semibold uppercase">Ratings</h3>
          </div>
          <p className="font-montserrat font-semibold text-base text-gray-700 uppercase">
            {data?.ratingsAverage}
          </p>
        </div>
      </div>
      <Divider />
      <div>
        <h1 className="text-lg font-montserrat font-bold mb-8 text-green-400 uppercase">
          Tour Guides
        </h1>
        <div className="flex flex-col gap-4">
          {data?.guides.map((guide, ind) => (
            <>
              {' '}
              <div className="grid grid-cols-2 items-center" key={guide.name}>
                <img
                  src={`/users/${guide?.photo}`}
                  className="w-14 h-14 rounded-full"
                ></img>

                <div>
                  <h1 className="font-montserrat font-semibold text-base text-gray-700 uppercase">
                    {guide?.role}
                  </h1>
                  <p className="font-montserrat font-normal text-md text-gray-700 uppercase">
                    {guide?.name}
                  </p>
                  <p className="font-montserrat font-light text-sm text-gray-700 uppercase">
                    {guide?.email}
                  </p>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactGuides;
