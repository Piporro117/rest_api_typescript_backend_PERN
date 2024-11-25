/**
 * Archivo principal
 */
import server from './server'
import colors from 'colors'

// definimos el puerto
const puerto = process.env.PORT || 4000


server.listen(puerto, () => {
    console.log(colors.blue.bold(`Se ejecuta en puerto ${puerto}`))
})
