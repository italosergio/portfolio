import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Navbar() {
  const { navBarListOn, setNavBarListOn } = useContext(AppContext)
  return (
    <>
      <nav className='navbar'>
        <a href='/home'>INÍCIO</a>
        <a href='/projects'>PROJETOS</a>
        <a href='/contact'>CONTATO</a>
      </nav>
      <button className='hamburger' onClick={() => setNavBarListOn(!navBarListOn)}>☰</button>
    </>
  );
}

export default Navbar;
