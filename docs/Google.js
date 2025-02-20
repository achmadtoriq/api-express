/**
 * @swagger
 * /google:
 *   get:
 *     summary: Get List Folder
 *     tags: [Google Drive]
 * 
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /google/{folderId}:
 *   get:
 *     summary: Get List Image
 *     tags: [Google Drive]
 *     parameters:
 *       - name: folderId
 *         in: path
 *         description: Folder ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 */

