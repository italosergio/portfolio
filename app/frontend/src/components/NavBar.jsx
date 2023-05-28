import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Navbar() {
  const { navBarListOn, setNavBarListOn } = useContext(AppContext)
  return (
    <>
      <nav className='navbar'>
        <a href='/home'>HOME</a>
        <a href='/projetos'>PROJETOS</a>
        <a href='/contato'>CONTATO</a>
      </nav>
      <button className='hamburger' onClick={() => setNavBarListOn(!navBarListOn)}>☰</button>
    </>
  );
}

export default Navbar;
