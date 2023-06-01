import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar';
import video from '../video/home-bg.mp4';
import image from '../images/avatar.png'

function Home() {
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
      <video autoPlay muted loop className='home-video fade-in'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      {
        backgroundLoaded && (
          <>
            <Header page='/home' />
            {
              renderOthers && (
                <>
                  <SideNavBar />
                  <div className='home-content fade-in'>
                    <div className='home-text'>
                      <h1>Desenvolvedor Web</h1>
                      <h1>Full Stack</h1>
                      <p>Transformando ideias em soluções inovadoras</p><br />
                      <button href='/projects' className="glow-on-hover">
                        Projetos  ➜
                      </button>
                    </div>
                    <img src={image} className='avatar fade-in' alt='My avatar'></img>
                  </div>
                </>
              )
            }
          </>
        )
      }
    </>
  );
}

export default Home;