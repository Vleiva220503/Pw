import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importamos la función para crear usuarios
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { auth } from "../../../../FrontEnd/src/views/default/firebase";

const Register = () => {
  const title = 'Register';
  const description = 'Register Page';

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
    terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
  const initialValues = { name: '', email: '', password: '', terms: false };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      // Crear el usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log('User created:', userCredential.user);
  
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      alert('Usuario registrado exitosamente');
  
      // Limpiar el formulario
      resetForm();
  
      // Opcional: Redirigir a la página de login o inicio
      navigate('/login'); // Si quieres redirigir automáticamente después del registro exitoso
  
    } catch (error) {
      console.error('Error al registrar usuario:', error);
  
      // Manejo de errores
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'El correo ya está en uso' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'El correo no es válido' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'La contraseña es muy débil' });
      } 
    } finally {
      setSubmitting(false);
    }
  };
  

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors, isSubmitting } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Maye Beauty Salón</h1>
            <h1 className="display-3 text-white">Refleja tu belleza interior</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
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
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use the form to register.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} />
              {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <div className="mb-3 position-relative form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
                {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
              </div>
            </div>
            <Button size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Signup'}
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

export default Register;
