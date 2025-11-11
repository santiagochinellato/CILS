import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import LogoCILS from '../components/LogoCILS';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-24 section min-h-[70vh] flex items-center">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo del estudio */}
            <div className="flex justify-center mb-8">
              <LogoCILS variant="color" width={200} className="opacity-60" />
            </div>
            
            {/* Código de error */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-accent2/20 text-primary font-montserrat font-bold text-6xl">
                404
              </span>
            </div>
            
            {/* Mensaje */}
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-4 text-text dark:text-white">
              Página no encontrada
            </h1>
            <p className="text-textLight text-lg mb-8">
              La página que buscas no existe o fue movida.<br />
              Te invitamos a volver al inicio o explorar nuestros servicios.
            </p>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bg-secondary hover:bg-primary text-white font-montserrat font-semibold px-6 py-3 rounded-md shadow transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver al inicio
              </Link>
              <Link 
                to="/servicios" 
                className="bg-white dark:bg-[#1F2C33] hover:bg-accent2/10 dark:hover:bg-accent2/10 text-primary border border-primary/20 font-montserrat font-semibold px-6 py-3 rounded-md shadow transition-all inline-flex items-center justify-center gap-2"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
