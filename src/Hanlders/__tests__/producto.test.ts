/**
 * Pruebas para endpoints
 */

import request from 'supertest'
import server from '../../server'


// pruebas para envios post
describe('POST api/productos/', () => {

    // prueba de validacion de datos
    test('debe mostrar errores de validaciones', async () => {
        // enviamos un body vacio por lo que las validaciones que pusimos deben funcionar
        const response = await request(server).post('/api/productos').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        // que tenga las 4 validaciones que le pusimos
        expect(response.body.errores).toHaveLength(3)

        // lo que no se espera
        expect(response.status).not.toBe(404)
        expect(response.body.errores).not.toHaveLength(2)
    })


    test('precio mayor que 0', async () => {
        const response = await request(server).post('/api/productos').send({
            nombre: "Prueba",
            precio: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        // que tenga las 4 validaciones que le pusimos
        expect(response.body.errores).toHaveLength(1)

    })

    test('precio mayor que 0 y es numerico', async () => {
        const response = await request(server).post('/api/productos').send({
            nombre: "Prueba",
            precio: "Hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        // que tenga las 4 validaciones que le pusimos
        expect(response.body.errores).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errores).not.toHaveLength(1)

    })


    test('debe crear un nuevo producto', async () => {
        // se hace un posto a la ruta, con el siguiente contenido
        const response = await request(server).post('/api/productos').send({
            nombre: "Mouse-Testing",
            precio: 600
        })

        // la respuesta esperada es un 201
        expect(response.status).toBe(201)

        // y que tenga un propiedad data en algun lugar
        expect(response.body).toHaveProperty('data')

        // pruebas no postivias
        // la respuesta esperada que no sea  200
        expect(response.status).not.toBe(200)

        // y que no tenga un 404 
        expect(response.status).not.toBe(404)
    })
})

// pruebas para peticones GET de proeductos
describe('GET api/productos/', () => {

    // primero probamos que la url exista
    test('debe existir la url de productos', async () => {
        const response = await request(server).get('/api/productos')

        expect(response.status).toBe(200)
        expect(response.status).not.toBe(404)
    })
    
    // prueba para obtener todos los prodcutos
    test('GET JSON de todos los productos', async () => {
        const response = await request(server).get('/api/productos')

        // esperemos que responda
        expect(response.headers['content-type']).toMatch(/json/) // que sea json
        expect(response.body).toHaveProperty('data') // que tenga la propiedad data
        expect(response.body.data).toHaveLength(1) // que solo tenga un dato

        // lo que no se espera que responda
        expect(response.body).not.toHaveProperty('errors') // que tenga la propiedad data

    })
})


// pruebas para pedir un producto por ID
describe('GET  api/productos/:id', () => {

    test('debe enviar 404 si no existe el producto', async () => {
        const productoid = 2000
        const response = await request(server).get(`/api/productos/${productoid}`)

        // lo que esperamos cuando no existe el producto
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('producto no encontrado')
    })  

    test('si le pasan una id invalia', async () => {
        const response = await request(server).get('/api/productos/id_no_valida')

        // lo que se espera si se manda una id invalida
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        expect(response.body.errores).toHaveLength(1)
        expect(response.body.errores[0].msg).toBe('ID NO VALIDO')
    })


    test('obtener respuesta json de un producto', async () => {
        const response = await request(server).get('/api/productos/1')

        // lo que se espera
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})


// pruebas para actualizar dato con put
describe('PUT /api/producto/:id', () => {
    // url valida}
    test('debe enviar errores si envia mal el id', async () => {
        const response = await request(server).get(`/api/productos/hola`).send({
            "nombre": "Teclado Actualizado",
            "precio": 300,
            "disponible": true
          }
        )

        // lo que esperamos cuando no existe el producto
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        expect(response.body.errores).toHaveLength(1)
        expect(response.body.errores[0].msg).toBe('ID NO VALIDO')
    }) 


    test('debe mostrar errores de validacion al actualizar producto', async () => {
        // le pasamos un objeto vacio
        const response = await request(server).put('/api/productos/1').send({})

        // esperamos que 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        expect(response.body.errores).toBeTruthy() // solo nos importa que contenga algo
        expect(response.body.errores).toHaveLength(4)

        // lo que no se espera
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('que mande validacion cuando el precio es negativo', async () => {
        const response = await request(server).put('/api/productos/1').send({
            nombre: "Teclado Actualizado",
            precio: 0,
            disponible: true
        })

        // esperamos
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        expect(response.body.errores).toHaveLength(1)
        expect(response.body.errores[0].msg).toBe('precio no valido')

        //no esperamos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })


    test('regresa error si no existe el producto', async () => {
        const response = await request(server).put('/api/productos/200').send({
            "nombre": "Teclado Actualizado",
            "precio": 300,
            "disponible": true
          }
        )

        // se espera
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('producto no encontrado')

        // no se espera
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        
    })


    test('actualizar producto', async () => {
        const response = await request(server).put('/api/productos/1').send({
            "nombre": "Teclado Actualizado",
            "precio": 300,
            "disponible": true
          }
        )

        // se espera
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        // no se espera
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
        
    })  
})


// pruebas para actualizar con patch
describe('PATCH /api/producto/:id', () => {

    test('validar que el producto cuando no existe', async () => {
        const productoId =  2000
        const response = await request(server).patch(`/api/productos/${productoId}`)

        // lo que se espera
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('producto no encontrado')

        // lo que no esperamos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('cambiar la disponibilidad a true', async () => {
        const response = await request(server).patch(`/api/productos/1`)

        // lo que se espera
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.disponible).toBe(false)

        // lo que no se espera
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })

})


// pruebas para la eliminacion de un dato
describe(' DELET /api/productos/:id', () => {

    test(' debe validar que sea id valido', async () => {
        const response = await request(server).delete('/api/productos/no_valida')

        // lo que se espera
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errores')
        expect(response.body.errores[0].msg).toBe("ID NO VALIDO")
    })

    test('validar producto no encontrado', async () => {
        const response = await request(server).delete('/api/productos/2000')

        // lo que se espera
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("producto no encontrado")

        // lo que no se espera
        expect(response.status).not.toBe(200)
    })

    test('cuando se elimina un producto', async () => {
        const response = await request(server).delete('/api/productos/1')

        // lo que esperamos
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('producto eliminado')

        // lo que no se espera
        expect(response.status).not.toBe(404)
    })
})