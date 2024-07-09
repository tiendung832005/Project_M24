import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';
import { BiSolidLogOut } from 'react-icons/bi';
import { NavLink, Route, Routes } from 'react-router-dom';
import "../scss/adminDashboard.scss";
type SidebarProps = {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
};

export default function Sidebar({ openSidebarToggle, OpenSidebar }: SidebarProps): JSX.Element {
  return (

    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> Rikkei Academy
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list' >
        <li className='sidebar-list-item'>
          <NavLink to='/dashboard'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to='/products'>
            <BsFillArchiveFill className='icon' /> Products
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to='/order'>
            <BsFillGrid3X3GapFill className='icon' /> Order
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to='/customer'>
            <BsPeopleFill className='icon' /> Customers
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to='/setting'>
            <BsFillGearFill className='icon' /> Setting
          </NavLink>
        </li>
        <li className='sidebar-list-item' style={{ marginTop: "220px" }}>
          <NavLink to='/loginAdmin'>
            <BiSolidLogOut className='icon' /> Log out
          </NavLink>
        </li>
      </ul>
    </aside>
    

    
    
  );
}
