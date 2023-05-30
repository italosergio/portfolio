import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import video from '../video/home-bg.mp4';
import image from '../images/avatar.png'

function Home() {

  return (
    <>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/home' />
      <SideNavBar />
      <div className='home-content'>
        <div className='home-text'>
          <h1>Desenvolvedor Web</h1>
          <h1>Full Stack</h1>
          <p>Transformando ideias em soluções inovadoras</p><br />
          <a href='/projects' className="projects-button">
            Projetos  ➜
          </a>
        </div>
        <img src={image} className='avatar' alt='My avatar'></img>

      </div>
    </>
  );
}

export default Home;