import { Router } from 'express';
import { allPaquetes, createPaquetes, deletePaquetes, facturaPaquete, selectPaquetes, updatePaquetes } from './handlers/paquetes';
import { allUsers, createusers, EditarPassword, Login, selectUsers, UpdateAllUsers, UpdateUsers } from './handlers/users';


import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware/validation';
import { autenticate } from './middleware/autenticate';
import { verifyToken } from './utils/VerifyToken';
import { paquetesVerify } from './middleware/paquetesVerify';
import { usuarioExist } from './middleware/usuarioExist';
import { GenerarPaquete } from './utils/GenerarPaquete';
import { CreateExist, ValidarUsuario } from './middleware/createValidate';
import { findPaquete } from './middleware/findPaquete';
import { PaqueteUser } from './middleware/paqueteUser';
import { NotEmpty } from 'sequelize-typescript';
import { verifyCorreo } from './middleware/VerifyCorreo';



const router = Router();

router.use('/paquetes', verifyToken)
router.use('/users', verifyToken)

router.post('/users-create',
    body('password').notEmpty().withMessage('la contraseña no puede ir vacío'),
    body('nombre').notEmpty().withMessage('El Nombre no puede ir vacío'),
    body('telefono').notEmpty().withMessage('El Telefono no puede ir vacío').isNumeric().withMessage('El telefono debe ser numerico'),
    body('correo').notEmpty().withMessage('El Correo no puede ir vacío').isEmail().withMessage('Email no válido'),
    handleInputErrors,
    CreateExist,
    ValidarUsuario,
    createusers);

router.post('/login', body('password').notEmpty().withMessage('la contraseña no puede ir vacío'),
    body('usuario').notEmpty().withMessage('El Correo no puede ir vacío'),
    handleInputErrors,
    autenticate, Login)

router.get('/users', selectUsers);//para usuarios normales
router.get('/users/all', allUsers);
router.put('/users/', body('nombre').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('correo').isEmail().withMessage('El correo no es valido'),
    handleInputErrors,
    verifyCorreo
    , UpdateUsers);
router.patch('/users/:id', UpdateAllUsers);

//paquetes
router.get('/paquetes', selectPaquetes);
router.get('/paquetes/all', allPaquetes);
router.post('/paquetes',
    body('usuario').notEmpty().withMessage('El nombre de Usuario esta Vacio'),
    body('tracking').notEmpty().withMessage('El tracking esta Vacio'),
    body('peso').isNumeric().withMessage('El peso debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio'),
    body('plan').notEmpty().withMessage('El plan esta Vacio'),
    handleInputErrors,
    usuarioExist,
    paquetesVerify,
    GenerarPaquete,
    createPaquetes);
router.put('/paquetes/:id', param('id').isNumeric().withMessage('Error de Id'), handleInputErrors, findPaquete, updatePaquetes);
router.delete('/paquetes/:id', param('id').isNumeric().withMessage('Error de Id'), handleInputErrors, findPaquete, deletePaquetes);


router.get('/paquetes/:id', param('id').isNumeric().withMessage('Error de Id'), handleInputErrors, findPaquete, PaqueteUser, facturaPaquete);


//forgot-password

router.post('/forgot-password',
    body('usuario').notEmpty().withMessage('El Usuario No Puede Ir Vacio'),
    body('correo').isEmail().withMessage('El Correo No es válido'),
    body('password').notEmpty().withMessage('El Password debe ser numerico')
    , handleInputErrors,usuarioExist,EditarPassword)





export default router;


