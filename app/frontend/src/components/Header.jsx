import React from 'react';
import NavBar from './NavBar';
import logo from '../images/logo1.png'

function Header(props) {
  return (
    <header className='header fade-in'>
      <div className='header-title'>
        <img src={logo} alt="Logo do titulo" className='logo'/>
        <div className='header-name'>
          <h1>{'<'} ÍTALO SÉRGIO {'/>'}</h1><span>DEV FULL STACK</span>
        </div>
      </div>
      <NavBar page={props.page} />
    </header>
  );
}

export default Header;