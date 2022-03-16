module.exports = ({ server, UserController }) => {
  const app = server.router();

  /**
   * @openapi
   * /User/:
   *   get:
   *     tags:
   *      - User
   *     description: Get all users
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.get("/", UserController.index.bind(UserController));

  /**
   * @openapi
   * /User/{id}:
   *   get:
   *     tags:
   *      - User
   *     description: Get User by id
   *     parameters:
   *        - name: id
   *          description: Id to get by
   *          in: path
   *          type: integer
   *          required: true
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.get("/:id", UserController.show.bind(UserController));

  /**
   * @openapi
   * /User/:
   *   post:
   *     tags:
   *      - User
   *     summary: Crate new User
   *     operationId: addUser
   *     requestBody:
   *      description: User object that needs to be added to the store
   *      content:
   *        application/json:
   *         schema:
   *           type: object
   *           properties:
   *             firstName:
   *               type: string
   *             lastName:
   *               type: string
   *             email:
   *               type: string
   *           xml:
   *             name: User
   *      required: true
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.post("/", UserController.store.bind(UserController));

  /**
   * @openapi
   * /User/{id}:
   *   put:
   *     tags:
   *      - User
   *     description: Update User by id
   *     parameters:
   *        - name: id
   *          description: Id to get by
   *          in: path
   *          type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.put("/:id", UserController.edit.bind(UserController));

  /**
   * @openapi
   * /User/{id}:
   *   delete:
   *     tags:
   *      - User
   *     description: Delete User by id
   *     parameters:
   *        - name: id
   *          description: Id to get by
   *          in: path
   *          type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.delete("/:id", UserController.delete.bind(UserController));

  return app;
};
