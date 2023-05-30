import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';

function Home() {

  return (
    <>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/home' />
      <SideNavBar />
    </>
  );
}

export default Home;