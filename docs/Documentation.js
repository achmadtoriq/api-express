/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login User Registered
 *     tags: [Authentication]
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: User Registered
 *     tags: [Authentication]
 */


/**
 * @swagger
 * /api/delete/{id}:
 *   get:
 *     summary: Login User Registered
 *     tags: [Authentication]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 */

