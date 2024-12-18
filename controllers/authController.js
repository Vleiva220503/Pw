const dbService = require('../database/dbService');
const helper = require('../helpers/dbHelpers');
const { generateToken } = require('../middlewares/jsonwebtoken');
const { comparePasswords } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/email/emailService");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { hashPassword } = require('../helpers/bcrypt');

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Tu configuración de Firebase
//import { generateToken } from '../middlewares/jsonwebtoken'; // Para generar el token JWT

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Intentamos autenticar al usuario con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

     
        const user = userCredential.user;

       
        if (user) {
            const userWithoutSensitiveData = {
                email: user.email,
                name: user.displayName || 'Usuario Firebase',
            };

            return res.json({
                ...userWithoutSensitiveData,
                isLogin: true,
                role_name: 'admin', 
                token: generateToken(userWithoutSensitiveData),
            });
        } else {
            
            return res.status(200).json({
                isLogin: false,
                message: "Usuario o contraseña incorrecto",
            });
        }

    } catch (error) {
      
        res.status(200).json({
            isLogin: false,
            message: "Usuario o contraseña incorrectos",
        });
    }
};


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const [userFound] = await dbService.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userFound) {
        const {user_id} = userFound;
        const resetToken = uuidv4();
        const { affectedRows } = await dbService.query('INSERT INTO ps_tokens (user_id, token, expired) VALUES (?, ?, ?)', [user_id, resetToken, 0]);
        const resetLink = `http://www.mayebeautysalon.com/reset-password/${resetToken}`;
        if (affectedRows > 0) {
            res.json({resetLink, status: true, message: 'Hemos enviado con éxito el enlace de restablecimiento a tu dirección de correo electrónico.' });
            await sendEmail('passwordRecoveryEmail', email, "Restablecimiento de contraseña", {
                resetLink,
                nombreUsuario: userFound.first_name
            });
        }
    } else {
        res.json({ status: false, message: 'Lo sentimos, no hemos encontrado el email del usuario. Por favor, verifica la información e intenta nuevamente.' });
    }
};

const resetPasswordTokenValidation = async (req, res) => {
    try {
        const { resetToken } = req.body;
        const [userToken] = await dbService.query('SELECT * FROM ps_tokens WHERE token = ?', [resetToken]);
        const { create_at, expired, user_id } = userToken;
        if (!expired) {
            const hoursDifference = moment(create_at).diff(moment(), 'hours');
            if (hoursDifference < 24) {
                res.json({ status: true, user_id, message: 'El token de validación es correcto. Proceso de verificación completado con éxito.' });
            } else {
                res.json({ status: false, message: 'El token de validación ha expirado. Por favor, inténtalo de nuevo.' });
            }
        } else {
            res.json({ status: false, message: 'El token de validación ha expirado. Por favor, inténtalo de nuevo.' });
        }
      } catch (error) {
        await dbService.query('INSERT INTO logs (log_id, affected_table, user_id, log_type, description) VALUES (NULL, ?, ?, ?, ?)', ['Autenticación', req.header('CurrentUserId'), 'error', error.message]);
        res.json({ status: false, message: 'El token de validación ha expirado. Por favor, inténtalo de nuevo.' });
    }
};


const updatingUserPassword = async (req, res) => {
    try {
        const { password, user_id, resetToken } = req.body;
        const [userToken] = await dbService.query('SELECT * FROM ps_tokens WHERE token = ?', [resetToken]);
        if (!userToken.expired) {
            const { affectedRows } = await dbService.query('UPDATE passwords SET password = ? WHERE user_id = ?', [await hashPassword(password), user_id]);
            const { affectedRows: affectedTokenRows } = await dbService.query('UPDATE ps_tokens SET expired = 1 WHERE token = ?; ', [resetToken]);
            if (affectedRows > 0 && affectedTokenRows > 0) {
                res.json({ status: true, message: 'Contraseña actualizada con éxito. Por favor, inicia sesión nuevamente. ¡Gracias!' });
            } else {
                res.json({ status: false, message: 'Se ha producido un error al intentar actualizar la contraseña. Por favor, inténtalo de nuevo.' });  
            }
        } else {
            res.json({ status: false, message: 'El token de validación ha expirado. Por favor, inténtalo de nuevo.' });
        }
      } catch (error) {
        await dbService.query('INSERT INTO logs (log_id, affected_table, user_id, log_type, description) VALUES (NULL, ?, ?, ?, ?)', ['Autenticación', req.header('CurrentUserId'), 'error', error.message]);
        res.json({ status: false, message: 'Se ha producido un error al intentar actualizar la contraseña. Por favor, inténtalo de nuevo.' });
    }
};


module.exports = {
    userLogin,
    tokenValidation,
    forgotPassword,
    resetPasswordTokenValidation,
    updatingUserPassword
}