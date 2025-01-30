import { Router } from 'express';
import { createPaquetes, deletePaquetes, selectPaquetes, updatePaquetes } from './handlers/paquetes';
import { createusers, Login, selectUsers, UpdateAllUsers, UpdateUsers } from './handlers/users';
import { sendMessage } from './handlers/sendMessage';

import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation';
import { autenticate } from './middleware/autenticate';
import { verify } from 'jsonwebtoken';
import { verifyToken } from './utils/VerifyToken';



const router = Router();

router.use('paquetes', verifyToken)

router.post('/users',
    body('contraseña').notEmpty().withMessage('la contraseña no puede ir vacío'),
    body('nombre').notEmpty().withMessage('El Nombre no puede ir vacío'),
    body('plan').notEmpty().withMessage('El Plan no puede ir vacío'),
    body('telefono').notEmpty().withMessage('El Telefono no puede ir vacío').isNumeric().withMessage('El telefono debe ser numerico'),
    body('correo').notEmpty().withMessage('El Correo no puede ir vacío').isEmail().withMessage('Email no válido'),
    handleInputErrors,
    createusers);

router.post('/login', body('contraseña').notEmpty().withMessage('la contraseña no puede ir vacío'),
    body('usuario').notEmpty().withMessage('El usuario no puede ir vacío'),
    handleInputErrors,
    autenticate, Login)

router.get('/users', verifyToken, selectUsers);
router.put('/users/', UpdateUsers);
router.patch('/users/:id', UpdateAllUsers);

//paquetes
router.get('/paquetes', selectPaquetes);
router.post('/paquetes', createPaquetes);
router.put('/paquetes/:id', updatePaquetes);
router.delete('/paquetes/:id', deletePaquetes);

//mensaje alternativo
router.post('/paquetes/alternative', sendMessage)




export default router;


