import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import video from '../video/contact-bg.mp4'
import gif404 from '../images/404.gif'

function NotFoundPage() {
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
      <video autoPlay muted loop className='video-404'>
        <source src={video} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      {
        backgroundLoaded && (
          <>
            <Header />
            {
              renderOthers && (
                <>
                  <SideNavBar />
                  <div class="gif-404-container fade-in">
                    <img
                      src={gif404}
                      className='gif-404'
                      alt="Imagem ovni abduzindo os numeros 404 atravez de um feixe de luz azul"
                    />
                    <div className='text-404'>
                      <h1>404 - Página não encontrada</h1>
                      <p>A página que você está procurando não foi encontrada.</p>
                      <br />
                      <a href='/home' className="button-404">
                        Início  ➜
                      </a>
                    </div>
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

export default NotFoundPage;