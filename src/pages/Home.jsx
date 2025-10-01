import React from 'react';
import Cerousel from '../components/Cerousel';
import MidBanner from '../components/MidBanner';
import  Features  from '../components/Features';

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Cerousel/>
      <MidBanner/>
      <Features/>
    </div>
  );
}

export default Home;
