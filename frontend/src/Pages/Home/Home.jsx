import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'

const Home = () => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <div className='viewfood-container'>
        <p>Nhà hàng</p>
      </div>
    </div>
  );
};

export default Home