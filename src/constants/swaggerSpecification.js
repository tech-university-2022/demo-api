/**
 * @openapi
 * /users:
 *   post:
 *     description: create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 required: true
 *                 type: string
 *                 description: must be valid email, user with this email must not exist in database
 *                 example: jane_doe@gmail.com
 *               name:
 *                 required: true
 *                 type: string
 *                 description: user's full name
 *                 example: Jane Doe
 *     responses:
 *       200:
 *         description: returns the created user on success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: user id from database
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: user email- will be unique among all other users
 *                   example: jane_doe@gmail.com
 *                 name:
 *                   type: string
 *                   description: user's full name
 *                   example: Jane Doe
 *       400:
 *         description: returns error message on bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: error message
 *                   example: email is required
*/
