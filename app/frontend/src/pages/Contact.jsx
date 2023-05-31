import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import Developing from '../components/Developing';
import video from '../video/contact-bg.mp4'

function Contact() {

  return (
    <>
      <video autoPlay muted loop className='contact-video fade-in'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/contact' />
      <SideNavBar />
      <Developing />
    </>
  );
}

export default Contact;