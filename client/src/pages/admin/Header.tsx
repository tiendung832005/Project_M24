import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import "../scss/adminDashboard.scss";


type HeaderProps = {
  OpenSidebar: () => void;
};

export default function Header({ OpenSidebar }: HeaderProps): JSX.Element {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <i><BsPersonCircle className='icon' /></i>
        <p className='hello'>Xin chào Admin!</p>
      </div>
    </header>
  );
}
