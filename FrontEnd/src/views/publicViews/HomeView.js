import React from 'react';
import { Container } from 'react-bootstrap';

export const HomeView = () => {
  return (
    <div className="home-page-hero">
      <Container>
        <div className="min-h-100 d-flex align-items-center">
          <div className="w-100 w-lg-75 w-xxl-50">
            <div>
              <div className="mb-5">
                <h1 className="display-3 text-white">Destello Beauty & Nails</h1>
                <h1 className="display-3 text-white">Destaca tu belleza interior y exterior con el cuidado perfecto para tus uñas</h1>
              </div>
              <p className="h6 text-white lh-1-5 mb-5">
                Nuestro equipo de estilistas expertos está aquí para realzar tu estilo con el mejor cuidado de uñas y belleza en nuestro salón unisex. Inicia
                sesión en tu cuenta para disfrutar de una experiencia exclusiva y descubre un mundo de belleza diseñado a tu medida, con resultados
                garantizados.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
