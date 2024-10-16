import { Router } from 'express';
import { createPaquetes, deletePaquetes, selectPaquetes, updatePaquetes} from './handlers/paquetes';
import { createusers, selectUsers, UpdateAllUsers, UpdateUsers } from './handlers/users';
import { sendMessage } from './handlers/sendMessage';



const router = Router();
router.post('/users', createusers );
router.get('/users', selectUsers );
router.put('/users/', UpdateUsers);
router.patch('/users/:id', UpdateAllUsers);

//paquetes
router.get('/paquetes',selectPaquetes );
router.post('/paquetes',createPaquetes );
router.put('/paquetes/:id',updatePaquetes );
router.delete('/paquetes/:id', deletePaquetes);

//mensaje alternativo
router.post('/paquetes/alternative', sendMessage)




export default router;


