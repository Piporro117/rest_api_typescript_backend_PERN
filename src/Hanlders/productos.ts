/**
 * manejador de funciones del modelo productos
 */

// importar para autocompletado
import {Response, Request, request} from 'express'
import Producto from '../Models/Producto.model'
import { check, validationResult } from 'express-validator'


// agregar a un producto a la tabla
export const crearProducto = async (request: Request, response: Response) => {

    try {
        // creamos un objeto producto con la informacion del request
        const producto = await Producto.create(request.body)
        response.status(201).json({data: producto})
    } catch (error) {
        //console.log(error)
    }
    
}

// obtener ulos productos de la BD
export const getProductos = async(request: Request, response: Response) => {
    try {
        // asi se pide que traiga a todos los productos
        const procutos = await Producto.findAll({
            order:[
                ['precio', 'DESC'] // ASC
            ],
            attributes: {exclude:['createdAt', 'updatedAt']}
        })
        
        response.json({data: procutos})
    } catch (error) {
        //console.log(error)
    }
}

// obtener solo un producto por id
export const getProductoPorId = async(request: Request, response: Response) => {
    try {
        // obtenemos el parametro con el nombre que le pusimos
        const { id } = request.params

        const producto = await Producto.findByPk(id)

        // si no hay un producto
        if(!producto){
            response.status(404).json({
                error:'producto no encontrado'
            })
            return 
        }

        response.json({data: producto})
    } catch (error) {
        //console.log(error)
    }
}


// funcion para actualizar producti desde el put
export const actualizarProducto = async (request: Request, response: Response) => {
    try {
        // primero veridicamos que el producto exsita
        const {id} = request.params

        const producto  = await Producto.findByPk(id)

        if(!producto){
            response.status(404).json({
                error:'producto no encontrado'
            })
            return
        }

        // si existe entonces se actualiza
        // obtenemos el prodicto y lo actualiza con el cuerpo que se envio en el body
        await producto.update(request.body)

        // y se guarda en la base de datos
        await producto.save()

        response.json({data:producto})

    } catch (error) {
        //console.log(error)
    }
}


// funcion de actualizar con el patch
export const actualizarDisponibilidadProducto = async (request: Request, response: Response) => {
    try {
        // primero veridicamos que el producto exsita
        const {id} = request.params

        const producto  = await Producto.findByPk(id)

        if(!producto){
            response.status(404).json({
                error:'producto no encontrado'
            })
            return
        }

        // si existe entonces se actualiza
        // obtenemos el prodicto y lo actualiza con el cuerpo que se envio en el body
        producto.disponible = !producto.dataValues.disponible

        // y se guarda en la base de datos
        await producto.save()

        response.json({data:producto})

    } catch (error) {
        //console.log(error)
    }
}

// funcon para la eliminacion de un producto
export const eliminarProducto =  async (request: Request, response: Response)  => {
    try {
        // primero veridicamos que el producto exsita
        const {id} = request.params

        const producto  = await Producto.findByPk(id)

        if(!producto){
            response.status(404).json({
                error:'producto no encontrado'
            })
            return
        }

        // para eliminar este producto se utiliza:
        await producto.destroy()

        response.json({data: "producto eliminado"})

    } catch (error) {
        
    }

}