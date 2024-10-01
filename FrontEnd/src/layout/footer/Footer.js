import React from 'react';
import { Col } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

export const Footer = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <footer className="text-white">
      {!isLogin && (
        <Col className="col-12 general-padding-x bg-primary text-white">
          <Col className="col-12 px-0 py-3 border-bottom border-white d-flex">
            <Col className="col-6 col-lg-2 p-0">Síguenos en redes sociales</Col>
            <Col className="col-6 col-lg-10 p-0 d-flex gap-2">
              <a className="text-white" href="https://www.instagram.com/maye_beautysalon/">
                <CsLineIcons icon="instagram" />
              </a>
              <a className="text-white" href="https://www.instagram.com/maye_beautysalon/">
                <CsLineIcons icon="facebook" />
              </a>
            </Col>
          </Col>

          <Col className="col-12 px-0 py-3 gap-5 d-flex pt-5 flex-column flex-lg-row">
            <Col className="col-12 col-lg-3 p-0">
              <h6 className="text-uppercase fw-bold mb-4">Destello Beauty & Nails</h6>
              <p className="mb-0">
                Nuestro equipo de estilistas expertos se dedica a realzar tu estilo con la más alta calidad en nuestro salón unisex. Inicia sesión en tu cuenta
                para disfrutar de una experiencia exclusiva y descubre un mundo de belleza hecho a tu medida, respaldado por nuestra garantía de excelencia.
              </p>
            </Col>

            <Col className="col-12 col-lg-4 p-0">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <p>
                <CsLineIcons icon="building" /> Las mercedes: ¿Cuántos metros? ¡Quién sabe! ¿Dónde es? Solo Dios lo sabe.
              </p>
              <p>
                <CsLineIcons icon="phone" /> +505 7774 2858
              </p>
            </Col>
          </Col>
        </Col>
      )}
      <Col className={classNames({ 'bg-primary': !isLogin })}>
        <div className="g-0 col-12 px-0 bg-secondary text-center py-3 text-dark copyright-footer">© 2024  | Destello Beauty & Nails </div>
      </Col>
    </footer>
  );
};
