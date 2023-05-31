import React from 'react';
import programming from "../images/programming.gif";

function Developing() {
  return (
    <div className='developing'>
      <h1>{`< Desenvolvendo />`}</h1>
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <img src={programming} className="img-programming" alt="Pessoa programando com amor" />
    </div>
  );
}

export default Developing;