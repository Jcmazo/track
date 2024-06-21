'use strict'

import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/storages.js'
import uploadMiddleware from '../utils/handleStorage.js'
import { authMiddleware } from '../middleware/sesion.js'
import { checkRol } from '../middleware/rol.js'

export default (app, route) => {
/**
* Get all storages
* @openapi
* /storages:
*          get:
*              tags:
*                   - storages
*              summary: 'get storages'
*              description: 'get all listed storages'
*              security:
*                       - bearerAuth: []
*              responses:
*                        '200':
*                              description: return list of storages.
*                              content:
*                                      application/json:
*                                                       schema:
*                                                            type: array
*                                                            items:
*                                                                  $ref: '#/components/schemas/storage'
*                        '422':
*                              description: Error validating storages.
*/
  app.get(route, authMiddleware, checkRol(['admin', 'user']), getItems)

  /**
* Get details from storage by id
* @openapi
* /storages/{id}:
*          get:
*              tags:
*                   - storages
*              summary: 'get storages'
*              description: 'get a storages by id'
*              security:
*                       - bearerAuth: []
*              parameters:
*                         - name: id
*                           in: path
*                           description: id of storages a return.
*                           required: true
*                           schema:
*                                  type: string
*              responses:
*                        '200':
*                              description: return a storages.
*                              content:
*                                      application/json:
*                                                       schema:
*                                                               $ref: '#/components/schemas/storage'
*                        '422':
*                              description: Error validating storages.
*/
  app.get(`${route}/:id`, getItem)

  /**
* Upload file
* @openapi
* /storages:
*           post:
*             tags:
*                   - storages
*             summary: "Upload file"
*             description: Subir un archivo
*             security:
*                       - bearerAuth: []
*             responses:
*                       '200':
*                             description: Retorna el objeto insertado en la coleccion.
*                       '422':
*                             description: Error de validacion.
*             requestBody:
*                         content:
*                                 multipart/form-data:
*                                                    schema:
*                                                           type: object
*                                                           properties:
*                                                                       myfile:
*                                                                       type: string
*                                                                       format: binary
*           responses:
*                     '201':
*                       description: Retorna el objeto insertado en la coleccion con stado '201'
*                     '403':
*                       description: No tiene permisos '403'
*/
  app.post(route, uploadMiddleware.single('myFile'), createItem)
  app.patch(`${route}/:id`, updateItem)

  /**
 * Delete storage
 * @openapi
 * /storages/{id}:
 *    delete:
 *      tags:
 *        - storages
 *      summary: "Eliminar storage"
 *      description: Elimiar el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validacion.
 */
  app.delete(`${route}/:id`, deleteItem)
}
