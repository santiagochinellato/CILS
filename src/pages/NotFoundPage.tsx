import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-24 section">
        <div className="container text-center">
          <h1 className="font-montserrat text-4xl font-bold mb-4">Página no encontrada</h1>
          <p className="text-textLight mb-6">La URL solicitada no existe. Vuelve al inicio o navega por el menú.</p>
          <Link to="/" className="bg-secondary hover:bg-primary text-white font-semibold px-5 py-3 rounded-md">Volver al inicio</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};
