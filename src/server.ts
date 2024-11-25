/**
 * Creacion del server de express
 */

import express, { request } from 'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'
// para la documentacion
import swaggerUi from 'swagger-ui-express'
import swaggerEspecific, { swaggerUIOptions } from './config/swagger'
// para cors
import cors, {CorsOptions} from 'cors'
// morgan
import morgan from 'morgan'


// conectar a base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgBlue.bold("Conexion exitosa a la base de datos"))
    } catch (error) {
        console.log(colors.red.bold( "Hubi un error en la conexion"))
        //console.log(error)
    }
}

connectDB()

// instancia de express
const server = express()

// permitir conexiones
const corsOpciones: CorsOptions = {
    origin: function(origen, callback){ // quien me esta pidiendo la peticion
        if(origen === process.env.FRONTEND_URL){
            callback(null, true) // permitimos la conexion si es del doinoom
        }else{
            console.log(new Error('Error de cors'))
        }
    } 
}
server.use(cors(corsOpciones))

// para leer los json de los formulario
server.use(express.json())

// morgan, permite que en nuestro log del servidor saber que peticiones se hacen
// que tipos, y a que hora
server.use(morgan('dev'))

// agregar la srutas
server.use('/api/productos', router)

// creamos nuestra ruta para la documentacion de la api
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerEspecific, swaggerUIOptions))

export default server