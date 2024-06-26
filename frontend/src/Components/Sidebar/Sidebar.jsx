import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className='sidebar'>
            <div className='shortcut-links'>
                <div className='side-link' onClick={() => handleNavigation('/')}>
                    <img src={home} alt="Home" />
                    <p>Home</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/viewfood')}>
                    <img src={game_icon} alt="ViewFood" />
                    <p>ViewFood</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/addfood')}>
                    <img src={automobiles} alt="AddFood" />
                    <p>AddFood</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/viewrestaurant')}>
                    <img src={sports} alt="ViewRestaurant" />
                    <p>ViewRestaurant</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/addrestaurant')}>
                    <img src={entertainment} alt="Addrestaurant" />
                    <p>AddRestaurant</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/viewprice')}>
                    <img src={tech} alt="ViewPrice" />
                    <p>ViewPrice</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/addprice')}>
                    <img src={music} alt="AddPrice" />
                    <p>AddPrice</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/deletefood')}>
                    <img src={blogs} alt="DeleteFood" />
                    <p>DeleteFood</p>
                </div>
                <div className='side-link' onClick={() => handleNavigation('/updatefood')}>
                    <img src={news} alt="UpdateFood" />
                    <p>UpdateFood</p>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default Sidebar;
