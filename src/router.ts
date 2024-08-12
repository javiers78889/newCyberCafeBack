import { Router } from 'express';
import { createPaquetes, selectPaquetes, updatePaquetes} from './handlers/paquetes';
import { createusers, selectUsers } from './handlers/users';



const router = Router();
router.post('/users', createusers );
router.get('/users', selectUsers );


router.get('/paquetes',selectPaquetes );
router.post('/paquetes',createPaquetes );
router.put('/paquetes/:id',updatePaquetes );




export default router;


