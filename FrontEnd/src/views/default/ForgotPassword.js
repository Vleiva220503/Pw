import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth'; // Importación de Firebase
import { auth } from '../../../../FrontEnd/src/views/default/firebase'; // Tu configuración de Firebase
import classNames from 'classnames';

const ForgotPassword = () => {
  const title = 'Forgot Password';
  const description = 'Forgot Password Page';
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
  });
  const initialValues = { email: '' };

  // Envío del formulario para reiniciar la contraseña
  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email); // Llama a Firebase para enviar el correo de restablecimiento
      toast.success('Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
      history.push('/login'); // Redirige al inicio de sesión tras éxito
    } catch (error) {
      const errorMessage =
        error.code === 'auth/user-not-found'
          ? 'No existe una cuenta asociada a este correo.'
          : 'Hubo un error al enviar el correo. Intenta nuevamente.';
      toast.error(errorMessage); // Muestra un mensaje de error basado en Firebase
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Maye Beauty Salón</h1>
            <h1 className="display-3 text-white">Refleja tu belleza interior</h1>
          </div>
          <p className="h2 text-white mb-5">
            Nuestro equipo de estilistas expertos está aquí para realzar tu estilo en nuestro salón unisex. Accede a tu cuenta para disfrutar de una experiencia
            exclusiva y descubre un mundo de belleza hecho a tu medida....
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Conocer más
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">¿Olvidaste tu contraseña?</h2>
          <h2 className="cta-1 text-primary">Recuperemosla!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Por favor ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña.</p>
          <p className="h6">
            Volver a la página de <NavLink to="/login">Inicio de Sesión</NavLink>.
          </p>
        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="filled form-group tooltip-end-top">
                <CsLineIcons icon="lock-off" />
                <Form.Control
                  type="email"
                  name="email"
                  className={classNames(errors.email && touched.email && 'border border-danger')}
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Email"
                />
              </div>
              {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <Button size="lg" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default ForgotPassword;
