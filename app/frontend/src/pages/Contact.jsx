import React from 'react';
import video from '../video/contact-bg.mp4'
import Header from '../components/Header'
import CardContact from '../components/CardContact';
import SideNavBar from '../components/SideNavBar';
import whatsappIcon from '../images/icon-whatsapp.svg'
import linkedinIcon from '../images/icon-linkedin.svg';
import githubIcon from '../images/icon-github.svg';
import instagramIcon from '../images/icon-instagram.svg';

function Contact() {
  const whatsappLink = "https://api.whatsapp.com/send?phone=5588994693031&text=Olá,%20estou%20enviando%20esta%20mensagem%20atraves%20do%20seu%20portfolio."
  const linkedinLink = "https://www.linkedin.com/in/italosergio"
  const githubLink = "https://www.github.com/italosergio"
  const instagramLink = "https://www.instagram.com/italosergio"
  return (
    <>
      <video autoPlay muted loop className='contact-video fade-in'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/contact' />
      <SideNavBar />
      <div className='contact-container-bg'></div>
      <div className='contact-content'>
        <CardContact title="WhatsApp" icon={whatsappIcon} link={whatsappLink} />
        <CardContact title="LinkedIn"icon={linkedinIcon} link={linkedinLink} />
        <CardContact title="GitHub" icon={githubIcon} link={githubLink} />
        <CardContact title="Instagram" icon={instagramIcon} link={instagramLink} />
      </div>
    </>
  );
}

export default Contact;