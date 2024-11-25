/**
 * Archivo para limpiar la base de datos
 */

import { exit } from 'node:process'
import db from '../config/db'

//
const limpiarBD = async () => {
    try {
        // eliminamos todos los datos de la base de dato 
        await db.sync({force: true})
        console.log('Se limpio la base de datos')
        exit(0) // finalizo sin errores
    } catch (error) {
        console.log(error)
        exit(1) // finaliza con errores
    }
}

// el 
if(process.argv[2] === '--clear'){
    limpiarBD()
}