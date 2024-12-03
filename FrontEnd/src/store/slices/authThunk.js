import { baseApi } from 'api/apiConfig';
//import { setCurrentUser } from './authSlice';


import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../FrontEnd/src/views/default/firebase";
import { setCurrentUser } from './authSlice';

// Simulamos un token falso
const generateFakeToken = (user) => {
  // Aquí puedes agregar la lógica para generar un token simulado (JWT falso, por ejemplo)
  return 'fake-jwt-token'; 
};

const loginUsuario = (loginData) => {
  return async (dispatch) => {
    const { email, password } = loginData;

    try {
      // Intentamos autenticar al usuario con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Si la autenticación es exitosa, generamos un token falso
      const fakeToken = generateFakeToken(user);

      const userWithToken = {
        email: user.email,
        name: user.displayName || 'Usuario Firebase', // Si no tiene displayName, asignamos un nombre por defecto
        role: 'admin', // Asignamos un rol 'admin' de manera fija
        token: fakeToken,
      };

      // Guardamos el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userWithToken));

      // Guardamos el usuario en el estado global (Redux)
      dispatch(setCurrentUser(userWithToken));

      // Retornamos los datos del usuario autenticado
      return { isLogin: true, ...userWithToken };
    } catch (error) {
      // Si el usuario no existe o hay un error de autenticación, devolvemos un mensaje de error
      return { isLogin: false, message: 'Usuario o contraseña incorrecto' };
    }
  };
};







const forgotPassword = (email) => {
  return async () => {
    try {
      const { data } = await baseApi.post('/auth/password-reset', { email });
      return data;
    } catch (error) {
      return error;
    }
  };
};

const updateUserPassword = (updatePassData) => {
  return async () => {
    try {
      const { data } = await baseApi.post('/auth/password-reset/update-password', updatePassData);
      return data;
    } catch (error) {
      return error;
    }
  };
};

export { loginUsuario, forgotPassword, updateUserPassword };
