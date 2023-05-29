import React from 'react';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';

function NotFoundPage() {
  return (
    <>
      <Header />
      <SideNavBar />
      <div>
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
    </>
  );
}

export default NotFoundPage;