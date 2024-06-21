'use strict'

import { login, createUser } from '../controllers/auth.js'

export default (app, route) => {
  /**
   * Route register a new user
   * @openapi
   * /auths/register:
   *    post:
   *        tags:
   *            - auth
   *        summary: 'register a new user'
   *        description: 'router for registering a new user'
   *        requestBody:
   *                   content:
   *                            application/json:
   *                                            schema:
   *                                                  $ref: '#/components/schemas/authRegister'
   *        responses:
   *                 '201':
   *                       description: 'user registered successfully'
   *                 '403':
   *                       description: 'Error registering'
   */
  app.post(`${route}/register`, createUser)
  app.post(`${route}/login`, login)
}
