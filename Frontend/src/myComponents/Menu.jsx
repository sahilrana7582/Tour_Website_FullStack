import React from 'react';
import { Button, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';

const Menu = ({ user, setShowUser }) => (
  <Card
    title={user}
    bordered={false}
    style={{
      width: 300,
    }}
    className="z-10"
  >
    <Link to="/home/profile">
      <p className="font-semibold text-sm ">Profile</p>
      <Divider />
    </Link>
    <Button
      className="w-full"
      onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setShowUser((prev) => !prev);
      }}
    >
      Logout
    </Button>
  </Card>
);
export default Menu;
