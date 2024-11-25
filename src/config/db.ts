/**
 * Archivo donde se encuentra la conexion de la base de datos
 * Squezile con postgres
 */
import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

// le pasamos el link de la variable de enetono
const db = new Sequelize(process.env.DATABASE_URL!, {
    models:[__dirname + '/../Models/**/*'],
    logging: false
})

export default db