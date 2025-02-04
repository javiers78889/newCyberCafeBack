import { Request, Response } from 'express';
import Paquetes from '../models/paquetes.model';
import { SendPaquetes } from '../utils/sendPaquetesMail';
import Users from '../models/users.model';
import { EntregaPaquetes } from '../utils/EntregaPaquetes';



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
    id: create.id,
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

export const facturaPaquete = async (req: Request, res: Response) => {
  const {id}= req.params
  console.log(id)
  try {
    const paquetes = await Paquetes.findAll({
      where: { id},
      order: [
        ['id', 'DESC']
      ]
    })

    res.status(200).json({ data: paquetes });
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

  try {
    const usuario = req.fpaquetes.get('usuario')
    const users = await Users.findOne({ where: { usuario} })
    const status = 'Entregado ✅'
    const pago = 'Entregado ✅'
    await req.fpaquetes.update({ status, pago })
    await req.fpaquetes.save()

    const Envio = {
      id: req.fpaquetes.get('id'),
      usuario: req.fpaquetes.get('usuario'),
      correo: users.get('correo'),
      tracking: req.fpaquetes.get('tracking'),
      peso: req.fpaquetes.get('peso'),
      precio: req.fpaquetes.get('precio'),
      tarifas: req.fpaquetes.get('tarifas'),
      status: req.fpaquetes.get('status')
    }
    await EntregaPaquetes(Envio)
    res.status(200).json('Paquete Entregado')
  }
  catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

export const deletePaquetes = async (req: Request, res: Response) => {
  try {
 
    await req.fpaquetes.destroy()


    res.status(200).json('Paquete eliminado');
  } catch (error) {
    res.status(500).json('Error al eliminar el paquete');
  }
};


