import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1>Italo Sergio</h1>
        <span>Desenvolvedor Full Stack</span>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;