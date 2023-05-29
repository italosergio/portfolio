import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Navbar(props) {
  const { navBarListOn, setNavBarListOn } = useContext(AppContext)
  const navIsActive = (page, href) => {
    if (page === href) return true;
  }
  return (
    <>
      <nav className='navbar'>
        <a href='/home' className={navIsActive(props.page, '/home') && 'nav-active'}>INÍCIO</a>
        <a href='/projects' className={navIsActive(props.page, '/projects') && 'nav-active'}>PROJETOS</a>
        <a href='/contact' className={navIsActive(props.page, '/contact') && 'nav-active'}>CONTATO</a>
      </nav>
      <button className='hamburger' onClick={() => setNavBarListOn(!navBarListOn)}>☰</button>
    </>
  );
}

export default Navbar;
