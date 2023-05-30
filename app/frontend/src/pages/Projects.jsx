import React from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import video from '../video/projects-bg.mp4'

function Projects() {

  return (
    <>
     <video autoPlay muted loop className='projects-video'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <Header page='/projects'/>
      <SideNavBar />
    </>
  );
}

export default Projects;