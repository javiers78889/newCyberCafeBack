import { Request, Response } from 'express';
import Paquetes from '../models/paquetes.model';
import { SendPaquetes } from '../utils/sendPaquetesMail';
import Users from '../models/users.model';



export const createPaquetes = async (req: Request, res: Response) => {
  const paquete = req.paqueteria

  const create = await Paquetes.create({
    usuario: paquete.usuario,
    tracking: paquete.tracking,
    peso: paquete.peso,
    precio: paquete.precio,
    tarifas: paquete.tarifas,
    status: paquete.status,
    pago: paquete.pago
  })

  const DatosEnvio = {
    id:create.id,
    usuario: req.datos.get().nombre,
    correo: req.datos.get().correo,
    tracking: req.paqueteria.tracking,
    peso: req.paqueteria.peso,
    precio: req.paqueteria.precio,
    tarifas: req.paqueteria.tarifas
  }
  await SendPaquetes(DatosEnvio)

  res.status(201).json('Paquete Registrado')

}


export const selectPaquetes = async (req: Request, res: Response) => {
  try {
    const paquetes = await Paquetes.findAll({
      where: { usuario: req.usuarios.dataValues.usuario },
      order: [
        ['id', 'DESC']
      ]
    })

    console.log(paquetes)

    res.status(201).json({ data: paquetes });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al obtener paquetes' }); // Devuelve un estado 500 en caso de error
  }

}

export const allPaquetes = async (req: Request, res: Response) => {
  try {
    const paquetes = await Paquetes.findAll({
      order: [
        ['id', 'DESC']
      ]
    })



    res.status(201).json({ data: paquetes });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al obtener paquetes' }); // Devuelve un estado 500 en caso de error
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


