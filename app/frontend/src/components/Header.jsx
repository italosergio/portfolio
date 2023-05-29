import React from 'react';
import NavBar from './NavBar';

function Header(props) {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1>Ítalo Chaves</h1>
        <span>Desenvolvedor Full Stack</span>
      </div>
      <NavBar page={props.page} />
    </header>
  );
}

export default Header;