import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../FrontEnd/src/views/default/firebase";

const ResetPassword = () => {
  const history = useHistory();
  const { resetToken } = useParams(); // Aunque Firebase no usa tokens personalizados en este caso
  const dispatch = useDispatch();

  const title = 'Restablecer Contraseña';
  const description = 'Pagina para restablecer contraseña de usuario';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Ingresa un correo válido').required('El correo es requerido'),
  });

  const initialValues = { email: '' };

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Correo de restablecimiento enviado. Por favor revisa tu bandeja de entrada.');
      history.push('/login');
    } catch (error) {
      const errorMessage =
        error.code === 'auth/user-not-found'
          ? 'No existe una cuenta asociada a este correo.'
          : 'Hubo un error al enviar el correo. Inténtalo nuevamente.';
      toast.error(errorMessage);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      {/* Contenido de lado izquierdo */}
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">¿Problemas con la contraseña?</h2>
          <h2 className="cta-1 text-primary">¡Renuevala aquí!</h2>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled">
              <CsLineIcons icon="envelope" />
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Correo electrónico"
              />
              {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <Button size="lg" type="submit">
              Enviar Correo de Restablecimiento
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

export default ResetPassword;
