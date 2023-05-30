import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import video from '../video/contact-bg.mp4'

function Contact() {

  return (
    <>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/contact' />
      <SideNavBar />
    </>
  );
}

export default Contact;