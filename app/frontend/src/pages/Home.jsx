import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';

function Home() {

  return (
    <>
      <Header page='/home' />
      <SideNavBar />
    </>
  );
}

export default Home;