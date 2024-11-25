/**
 * Creacion del modelo de la tabla de procuto
 */
import { Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'productos'
})

class Producto extends Model {
    @Column({
        type:DataType.STRING(100)
    })
    declare nombre: string

    @Column({// extennsion y decimale 
        type:DataType.FLOAT(5, 2)
    })
     declare precio: number

    @Default(true)
    @Column({
        type:DataType.BOOLEAN
    })
    declare disponible: boolean
}

export default Producto