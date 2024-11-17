import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Route, Routes } from 'react-router-dom';
import Overview from './Pages/Overview';
import Layout from './layout/Layout';
import Home from './pages/Home';
import TourDetail from './Pages/TourDetail';
import Auth from './Pages/Auth';
import { Profile } from './Pages/Profile';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path=":id" element={<TourDetail />}></Route>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={<Auth />} />
    </Routes>
  );
}

export default App;
