/** 
 * Archivo donde se definena las rutas de nuestra api
 * */ 
import { Router } from 'express'
import { body, param } from 'express-validator'

//importamos los handlers 
import { crearProducto, getProductos, getProductoPorId, actualizarProducto, actualizarDisponibilidadProducto, eliminarProducto} from './Hanlders/productos'
import { hablderInputErrors } from './Middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas: 
 *          Productos:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      description: El producto id
 *                      example: 1 
 *                  nombre: 
 *                      type: string
 *                      description: El nombre del producto
 *                      example: Televisor de 40 pulgadas
 * 
 *                  precio:
 *                      type: number
 *                      description: El precio del producto
 *                      example: 300
 * 
 *                  disponible:
 *                      type: boolean
 *                      description: La disponibilidad del producto
 *                      example: true
 * 
 *          mensajes:
 *              type: object
 *              properties:
 *                  data: 
 *                      type: string
 *                      description: El mensaje que te mandara si es exitoso
 *                      example: producto eliminado
 */                     

/**
 * @swagger
 * /api/productos:
 *      get: 
 *          summary: Obtiene una lista de productos
 *          tags: 
 *              - Productos
 *          description: Regresa un listado de todos los productos de la base de datos
 *          responses: 
 *              200:
 *                  description: Exito de respuesta
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Productos'
 *  
 * 
 */

// ruta para todos los productos 
router.get('/', getProductos)

//ruta para solo uno
/**
 * @swagger
 * /api/productos/{id}:
 *      get:
 *          summary: GET un producto por su ID
 *          tags:
 *              - Productos
 *          description: Regresa un producto basado en su ID unico
 *          parameters: 
 *              - in: path
 *                name: id
 *                description: El ID del producto a obtener
 *                required: true
 *                schema: 
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Respuesta Exitosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              404:
 *                  description: Producto no encontrdo
 *              400:
 *                  description: Bad request - Envio de ID invalido
 */
router.get('/:id',
    param('id').isInt().withMessage('ID NO VALIDO'),
    hablderInputErrors,  
    getProductoPorId
)


// creacion de un producti
/**
 * @swagger
 * /api/productos:
 *      post:
 *          summary: Crear un nuevo producto
 *          tags:
 *              - Productos
 *          description: Regresa un nuevo registro en la base de datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              nombre: 
 *                                  type: string
 *                                  example: "Monitor Curvo de 40 pulgadas"
 *                              precio:
 *                                  type: number
 *                                  example: 399 
 * 
 *          responses:
 *              201:
 *                  description: Producto creado exitosamente
 *              400: 
 *                  description: Bad Request- Datos invalidos
 */         
router.post('/', 
    body('nombre').notEmpty().withMessage("No puede ir vacio nombre"),
    body('precio').isNumeric().withMessage("Debe ser numerico")
    .custom(valor => valor > 0).withMessage("No puede ser precio 0"),
    hablderInputErrors,
    crearProducto
)

// actualizar un producto con PUT
/**
 * @swagger
 * /api/productos/{id}:
 *      put:
 *          summary: Actualizar un producto con el usuario input
 *          tags:
 *              - Productos
 *          description: Regresa un dato actualizado
 *          parameters:
 *                - in: path
 *                  name: id
 *                  description: El ID del producto a obtener
 *                  required: true
 *                  schema: 
 *                      type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              nombre: 
 *                                  type: string
 *                                  example: "Monitor Curvo de 40 pulgadas"
 *                              precio:
 *                                  type: number
 *                                  example: 399
 *                              disponible:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Exito de respuesta
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              400:
 *                  description: Bad request - ID invalido o datos invalidos
 *              404:
 *                  description: Producto no encontrado
 * 
 */
router.put('/:id',
    param('id').isInt().withMessage('ID no valido'), 
    body('nombre').notEmpty().withMessage("No puede ir vacio nombre"),
    body('precio').isNumeric().withMessage("Debe ser numerico"),
    body('precio').custom(valor => valor > 0).withMessage('precio no valido'),
    body('disponible').isBoolean().withMessage("Debe ser un bolleano"),
    hablderInputErrors,
    actualizarProducto
)

// actualizar disponibilidad
/**
 * @swagger
 * /api/productos/{id}:
 *      patch:
 *          summary: Actualizar la disponibilidad del producto
 *          tags:
 *              - Productos
 *          descriptions: Retorna una actualziacion del disponibilida del producto dado
 *          parameters:
 *                - in: path
 *                  name: id
 *                  description: El ID del producto a obtener
 *                  required: true
 *                  schema: 
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Exito de respuesta
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              400:
 *                  description: Bad request - ID invalido
 *              404:
 *                  description: Producto no encontrado
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    hablderInputErrors,
    actualizarDisponibilidadProducto)


// ruta para eliminar un producto
/**
 * @swagger
 * /api/productos/{id}:
 *      delete:
 *          summary: Elimina el producto por ID
 *          tags:
 *              - Productos
 *          description: Elimina el id dado en la url 
 *          parameters:
 *               - in: path
 *                 name: id
 *                 description: El ID del producto a eliminar
 *                 required: true
 *                 schema: 
 *                     type: integer
 *          responses:
 *              200:
 *                  description: Exito en la respuesta
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/mensajes'
 *                          
 *              400:
 *                  description: EL IDE es no valido
 *              404:
 *                  description: El producto no fue encontrado
 * 
 *          
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    hablderInputErrors,
    eliminarProducto
)


// exportamos el router
export default router