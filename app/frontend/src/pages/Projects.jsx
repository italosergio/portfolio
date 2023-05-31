import React, { useEffect, useState } from 'react';
import Developing from '../components/Developing';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import video from '../video/projects-bg.mp4'

function Projects() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [renderOthers, setRenderOthers] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBackgroundLoaded(true);
      setTimeout(() => { setRenderOthers(true) }, 1000)
    }, 1000);
  }, []);
  
  return (
    <>
      <video autoPlay muted loop className='projects-video fade-in'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      {
        backgroundLoaded && (
          <>
            <Header page='/projects' />
            {
              renderOthers && (
                <>
                  <SideNavBar />
                  <Developing />
                </>
              )
            }
          </>
        )
      }

    </>
  );
}

export default Projects;