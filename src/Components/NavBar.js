import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBarData } from './SideBarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';



export const Nav = styled.nav`
  background: #000;
  height: 80px,
  display: flex,
  justify-content" space-between;
  padding: 0.5rem calc((100vw-1000px) / 2);
  z-index: 10;
`
export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&.active {
  color: #15cdfc;
}
`
export const Bars = styled(FaBars)`
display: none;
color: #fff;

@media screen and (max-with: 760px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 75%);
  font-size: 1.8rem;
  cursor: pointer;
}
`

export const NavMenu = styled.div`
display: flex;
algin-items: center;
margin-right: -24px;

@media screen and (max-width: 768px) {
  display: none;
}
`
export const NavBtn = styled.div`
display: flex;
algin-items: center;
margin-right: 24px;

@media screen and (max-width: 768px) {
  display: none;
}
`

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #256ce1;
padding: 10px 22px;
color: #fff;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&hover {
  transition: all 0.2s ease-in-out;
  background: #fff;
  color: #010606;
}
`



const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default NavBar;
