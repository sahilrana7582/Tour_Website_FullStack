import React from 'react';
import { Card, Image } from 'antd';
const { Meta } = Card;
const PicCard = ({ img }) => (
  <Image src={`/images/${img}`} className="flex-1" />
);
export default PicCard;
