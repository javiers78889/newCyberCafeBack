import { Router } from 'express';
import { createPaquetes, selectPaquetes, updatePaquetes} from './handlers/paquetes';
import { createPaquetes, deletePaquetes, selectPaquetes, updatePaquetes} from './handlers/paquetes';
import { createusers, selectUsers, UpdateUsers } from './handlers/users';



const router = Router();
router.post('/users', createusers );
router.get('/users', selectUsers );
router.put('/users/', UpdateUsers);

router.get('/paquetes',selectPaquetes );
router.post('/paquetes',createPaquetes );
router.put('/paquetes/:id',updatePaquetes );
router.delete('/paquetes/:id', deletePaquetes);




export default router;


