/**
 * Archivo middleware
 */
// siempre en los middleware se tiene que importar el request y el response y el next
import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

// el next es decir , que se termino esta funcion , ahora ve a la siguiente
export const hablderInputErrors = (request: Request, response: Response, next: NextFunction) => {
    
    // recuperar los errores de validacion
    let errores = validationResult(request)
    if(!errores.isEmpty()){
        response.status(400).json({errores: errores.array()})
        return 
    }
    
    next()
}