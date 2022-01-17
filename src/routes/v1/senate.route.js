const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const senateValidation = require('../../validations/senate.validation');
const senateController = require('../../controllers/senate.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSenate'), validate(senateValidation.createSenate), senateController.createSenate)
  .get(senateController.getLatestSenate);

router.route('/tenures').get(senateController.getSenateTenures);

router
  .route('/:senateId')
  .get(validate(senateValidation.getSenateById), senateController.getSenateById)
  .patch(auth('manageSenate'), validate(senateValidation.updateSenate), senateController.updateSenate)
  .delete(auth('manageSenate'), validate(senateValidation.deleteSenate), senateController.deleteSenate);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Senate
 *   description: Senate management and retrieval
 */

/**
 * @swagger
 * /senate:
 *   post:
 *     summary: Create a senate
 *     description: Only admins can create a senate.
 *     tags: [Senate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startYear
 *               - endYear
 *             properties:
 *               startYear:
 *                 type: number
 *               endYear:
 *                 type: number
 *               members:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *             example:
 *               startYear: 2021
 *               endYear: 2022
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Senate'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSenate'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get latest senate
 *     tags: [Senate]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Senate'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /senate/tenures:
 *   get:
 *     summary: Get all senate tenures
 *     tags: [Senate]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tenure'
 */

/**
 * @swagger
 * /senate/{senateId}:
 *   get:
 *     summary: Get details of members of a senate by senateId
 *     tags: [Senate]
 *     parameters:
 *       - in: path
 *         name: senateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Senate id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Senate'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a senate
 *     description: Only admin can update any senate.
 *     tags: [Senate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Senate id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               members:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *             example:
 *               members:
 *                 - name: XYZ ABC
 *                   position: president
 *                   imageUrl: https://via.placeholder.com/350x150
 *                   facebook: https://www.facebook.com/ashish.cv.12d
 *                 - name: XYZ ABC
 *                   position: chairperson
 *                   imageUrl: https://via.placeholder.com/350x150
 *                   facebook: https://www.facebook.com/balatejaswi.kedasu
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Senate'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a senate
 *     description: Only admin can delete any senate.
 *     tags: [Senate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Senate id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
