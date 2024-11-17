import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Avatar } from 'antd';
import Menu from './Menu';

const navLinks = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/home',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact Us',
  },
];

const Nav = () => {
  const [user, setUser] = useState();
  const [showUser, setShowUser] = useState(false);
  console.log(user);

  useEffect(() => {
    const user = localStorage.getItem('name');
    if (user != '') {
      setUser(user);
    }
  });
  return (
    <div className="flex gap-10 px-10 justify-between h-20 items-center shadow-lg relative">
      <img src="/logo.png" className="w-10 h-10"></img>
      <div className="flex gap-10">
        {navLinks.map((link, ind) => (
          <Link to={link.href} key={ind}>
            <h3 className="uppercase font-palanquin font-semibold hover:text-green-400 hover:transition-all duration-500">
              {link.label}
            </h3>
          </Link>
        ))}
      </div>
      <div>
        {user ? (
          <Avatar
            size={40}
            className="cursor-pointer"
            onClick={() => setShowUser(!showUser)}
          >
            {user.split(' ')[0]}
          </Avatar>
        ) : (
          <Link to="/login">
            <Button variant="outlined" color="inherit">
              Login
            </Button>
          </Link>
        )}
      </div>
      {showUser && (
        <div className="bg-slate-200 absolute right-9 top-16 shadow-xl">
          <Menu user={user} setShowUser={setShowUser} />
        </div>
      )}
    </div>
  );
};

export default Nav;
