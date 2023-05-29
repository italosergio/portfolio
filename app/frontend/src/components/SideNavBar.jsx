import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SideNavBar() {
  const { navBarListOn, setNavBarListOn } = useContext(AppContext);

  return (
    <nav className={`navbar-list ${!navBarListOn && 'show-sidebar'}`} onClick={() => setNavBarListOn(false)}>
      <a href='/home' onClick={() => setNavBarListOn(false)}>INÍCIO</a>
      <a href='/projetos' onClick={() => setNavBarListOn(false)}>PROJETOS</a>
      <a href='/contato' onClick={() => setNavBarListOn(false)}>CONTATO</a>
      <span style={{ fontSize: '15px' }}>{'>'}</span>
    </nav>
  );
}

export default SideNavBar;
