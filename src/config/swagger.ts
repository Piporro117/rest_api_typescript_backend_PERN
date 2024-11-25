/**
 * colocar la informacion  general de mi api 
 */
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const opciones : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags:[{
            name: 'Productos',
            description: 'Api operaciones de productos'
            }
        ],
        info:
        {
            title: 'REST API Node.js / Express /TypeScript',
            version: "1.0.0",
            description: "API DOCS para productos"
        }
    },
    apis:['./src/routes.ts'] // donde estas los endpoints
}

// utilizamos lo que creamos arriba
const swaggerEspecific = swaggerJSDoc(opciones)


// para modificar el visual de swagger
const swaggerUIOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://media.contentapi.ea.com/content/dam/eacom/pvz/pvzgw2/common/logo-sm.png');
            height: 80px;
            width: 60px; 
        }
        
        .swagger-ui .topbar{
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / typeScript'
}


// lo importamos 
export default swaggerEspecific

export {
    swaggerUIOptions
}