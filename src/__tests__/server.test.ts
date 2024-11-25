/**
 * Prueba 
 */

import server, { connectDB }  from '../server'
import db from '../config/db'

// forzar errroes
jest.mock('../config/db')

describe('connectDB', () => {

    test('debe manejar el error de base de datos', async () =>{

        // este spyOn vigila la linea donde la base de datos se autentica
        // y rechaza la autenticacion para mandar un error en el catch
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error("Hubi un error en la conexion"))
        
        // ponemos otro espia en la consola del metodo, que estara viendo el console.log
        const consoleSpy = jest.spyOn(console, 'log')

        // llamamos al metod
        await connectDB()

        // Y ponemos que esperamos que nuestro espia de consolo contenga con el catch
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubi un error en la conexion"))
    })
})