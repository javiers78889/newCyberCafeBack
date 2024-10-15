import { Request, Response } from 'express';
import Paquetes from '../models/paquetes.model';
import { validationResult, check } from 'express-validator';
import { Sender } from '../middleware/sender';


export const createPaquetes = async (req: Request, res: Response) => {
  await check('usuario').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
  await check('tracking').notEmpty().withMessage('El tracking esta Vacio').run(req)
  await check('peso').isNumeric().withMessage('El peso debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
  await check('precio').isNumeric().withMessage('El precio debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
  await check('tarifa').isNumeric().withMessage('El tarifa debe ser numerico').notEmpty().withMessage('El nombre de Usuario esta Vacio').run(req)
  
  const paquetes = await Paquetes.create(req.body)
  Sender(req.body)

  res.status(201).json('Todo Bien')

}


export const selectPaquetes = async (req: Request, res: Response) => {
  try {
    const paquetes = await Paquetes.findAll({
      order: [
        ['id', 'DESC']
      ]
    })

    res.status(201).json({ data: paquetes });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' }); // Devuelve un estado 500 en caso de error
  }

}
export const updatePaquetes = async (req: Request, res: Response) => {

  const { id } = req.params
  const product = await Paquetes.findByPk(id)

  console.log(req.body)
  await product.update(req.body)
  await product.save()
    .then(() => {
      res.status(201).json({ message: 'Producto actualizado Correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al Actualizar el producto', error });
    });
}

export const deletePaquetes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paquete = await Paquetes.findByPk(id);

    if (!paquete) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    paquete.destroy()


    res.status(200).json({ message: 'Paquete eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paquete', error });
  }
};


