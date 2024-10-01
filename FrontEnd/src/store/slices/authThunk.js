import { setCurrentUser } from './authSlice';

// Simulamos un usuario quemado
const hardcodedUser = {
  email: 'leivavictor220503@gmail.com',
  password: '123456',
  name: 'Usuario Bypass',
  role: 'admin',
};

const loginUsuario = (loginData) => {
  return async (dispatch) => {
    const { email, password } = loginData;

    // Simulamos la autenticación verificando los datos quemados
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      const fakeToken = 'fake-jwt-token'; // Simulamos un token
      const userWithToken = { ...hardcodedUser, token: fakeToken };
      
      // Guardamos el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userWithToken));

      // Guardamos el usuario en el estado global (Redux)
      dispatch(setCurrentUser(userWithToken));

      // Retornamos el usuario autenticado
      return { isLogin: true, ...userWithToken };
    } else {
      // Simulamos el fallo de autenticación
      return { isLogin: false, message: 'Usuario o contraseña incorrectos' };
    }
  };
};

export { loginUsuario };
